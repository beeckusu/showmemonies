import { Card, Tab, Tabs } from "react-bootstrap";
import AdjustTags from "./postGeneration/AdjustTags";
import TransactorsTable from "./postGeneration/TransactorsTable";
import AdjustTransactions from "./postGeneration/AdjustTransactions";

import '../css/layout.css';

const TransactionsPage = () => {

    return (
        <Card style={{width: "600px", maxHeight: "400px", overflowY: "auto"}}>
            <Tabs
                defaultActiveKey="transactors"
                className="centered">
                <Tab eventKey="tags" title="Tags">
                    <AdjustTags />
                </Tab>
                <Tab eventKey="transactors" title="Transactors">
                    <TransactorsTable />
                </Tab>
                <Tab eventKey="transactions" title="Transactions">
                    <AdjustTransactions />
                </Tab>
            </Tabs>
        </Card>
    );

}

export default TransactionsPage;