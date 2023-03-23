import { useState, useContext, React } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { BudgetContext } from '../context/BudgetContext';
import { GraphProvider, GraphContext } from '../context/GraphContext';
import { Dropdown } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

const intervals = [
    { label: 'Day', value: function(date) {
        return date.toLocaleString('default', { month: 'short', day: "numeric", year: "numeric" })
    }},
    { label: 'Week', value: function(date) {
        date.setDate(date.getDate() - date.getDay());
        return date.toLocaleString('default', { month: 'short', day: "numeric", year: "numeric" })
    }},
    { label: 'Month', value: function(date) {
        return date.toLocaleString('default', { month: 'short', year: "numeric" })
    }},
    { label: 'Year', value: function(date) {
        return date.toLocaleString('default', { year: "numeric" })
    }},
];

function fetchChartData(transactions, interval) {
    
    const amountByIntervalAndTag = transactions.reduce((data, transaction) => {
        const date = new Date(transaction["date"]);

        let dateKey = null;
        for (let i of intervals) {
            if (i["label"] === interval) {
                dateKey = i["value"](date);
                break;
            }
        }

        const existingDate = data.find(item => item.key === dateKey);
        const tagName = transaction.transactor.tags.length > 0 ? transaction.transactor.tags[0].name : "";

        if (existingDate) {
            const existingTag = existingDate.tags.find(t => t.name === tagName);
            if (existingTag) {
                existingTag["amount"] += transaction["amount"];
            }
            else {
                existingDate.tags.push({name: tagName, amount: transaction["amount"]})
            }
        }
        else {
            data.push({ key: dateKey, tags: [{name: tagName, amount: transaction["amount"] }]});
        }
        return data;
    }, []);

    // Transform data to format expected by BarChart
    const data = amountByIntervalAndTag.map(item => {
        const result = { key: item.key };
        item.tags.forEach(tag => {
            result[tag.name] = tag.amount;
        });
        return result;
    });
    return data;
}

const SummaryChart = ({transactions, tags}) => {

    if (!tags.some(tag => tag.name === "")){
        tags.push({id: uuidv4(), name: "", color: "#8884d8"});
    }

    const { interval } = useContext(GraphContext);
    let data = fetchChartData(transactions, interval);

    return (
        <BarChart width={600} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="key" />
            <YAxis />
            <Tooltip />
            <Legend />
            {tags.map((tag, index) => (
                <Bar key={tag.id} dataKey={tag.name} stackId={tag.id} fill={tag.color} />
            ))}
        </BarChart>
    );
};

const GraphControls = () => {

    const { dispatch } = useContext(GraphContext);

    const onSelect = (value, event) => {
        setSelectedInterval(event.target.innerText);

        const payload = {
            id: uuidv4(),
            interval: event.target.innerText
          }
      
          dispatch({
            type: 'CHANGE_DATE_INTERVAL',
            payload: payload,
          });
    }

    const [selectedInterval, setSelectedInterval] = useState(intervals[0].label);


    return (
        <div>
            <Dropdown onSelect={onSelect}>
                <Dropdown.Toggle variant="light" id="date-interval-dropdown">
                    {selectedInterval}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {intervals.map(interval => (
                        <Dropdown.Item key={interval.value} eventKey={interval.value}>
                            {interval.label}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}

const GraphPage = () => {

    const { transactions, tags } = useContext(BudgetContext);

    return (
        <div>
            <GraphProvider>
                <GraphControls />
                <SummaryChart transactions={transactions.income} tags={tags}/>
                <SummaryChart transactions={transactions.expenses} tags={tags}/>
            </GraphProvider>
        </div>
    );
}

export default GraphPage;