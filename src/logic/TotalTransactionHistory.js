class TotalTransactionHistory {
    constructor(expenses, income) {
        this.expenses = expenses;
        this.income = income;

        this.transactors = expenses.map(x => x["transactor"]).concat(income.map(x => x["transactor"]));
        this.transactors = this.transactors.map(x => {return {"name": x, "tags": []}});

        for (let expense of this.expenses) {
            expense["transactor"] = this.transactors.find(transactor => transactor.name === expense.transactor);
        }
        for (let income of this.income) {
            income["transactor"] = this.transactors.find(transactor => transactor.name === income.transactor);
        }

    }

    removeTransactor(transactor) {
        this.expenses = this.expenses.filter((expense) => expense["transactor"] !== transactor["name"]);
        this.income = this.income.filter((source) => source["transactor"] !== transactor["name"]);

        this.transactors = this.transactors.filter(x => x !== transactor);
    }

    removeTransaction(transaction) {

        if (transaction.transactionType === "INCOME") {
            this.income = this.income.filter((source) => source["id"] !== transaction["id"]);
        }
        else {
            this.expenses = this.expenses.filter((source) => source["id"] !== transaction["id"]);
        }
        console.log(transaction);
    }

    removeTag(tagToRemove) {
        for (let transactor of this.transactors) {
            transactor.tags = transactor.tags.filter((tag) => tag.id !== tagToRemove.id);
        }
    }

}

export default TotalTransactionHistory;