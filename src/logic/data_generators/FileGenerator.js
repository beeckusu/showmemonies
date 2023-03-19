import { ExcelRenderer } from 'react-excel-renderer';
import TotalTransactionHistory from '../TotalTransactionHistory';

class FileGenerator {
    canParse(source) {
        return true;
    }

    parseData(source) {

        return new Promise((resolve, reject) => {
            ExcelRenderer(source, (error, response) => {
                if (error) {
                    console.log(error);
                }
                else {

                    let expenses = [];
                    let income = [];

                    for (let index in response.rows) {
                        let row = response.rows[index]
                        let transaction = this.adaptRowToDict(row);
                        transaction["id"] = index;
                        if (this.isExpense(transaction)) {
                            expenses.push(transaction);
                        }
                        else {
                            income.push(transaction);
                        }
                    }
                    let toBe = new TotalTransactionHistory(expenses, income);
                    resolve(toBe);
                }
            });
        });
    }

    adaptRowToDict(row) {
        return {
            'date': new Date((row[0] - (25567 + 1)) * 86400 * 1000),
            'transactor': row[1],
            'amount': (row[2] != null) ? row[2] : row[3],
            'transactionType': (row[2] != null) ? 'EXPENSE' : 'INCOME'
        }
    }

    isExpense(transaction) {
        return transaction['transactionType'] === 'EXPENSE';
    }

}

export default FileGenerator;