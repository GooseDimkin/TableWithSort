import { useEffect, useState } from 'react';
import styles from './Table.module.css';
import React from 'react';
import Pagination from './../pagination/Pagination';

function Table(props) {
    
    const [currentText, setCurrentText] = useState('');

    const [selectedColumn, setSelectedColumn] = useState(null);
    const [selectedCondition, setSelectedCondition] = useState(null);
    const [selectedValue, setSelectedValue] = useState(null);

    const [filter, setFilter] = useState(false);

    const ref = React.createRef();

    const getIndexOfFilteredEqualsData = () => {
        let indexes = [];

        if(selectedColumn === 'Name') {
            for(let i = 0; i < props.data.length; ++i) {
                if(props.data[i].name.toLowerCase() === selectedValue.toLowerCase())
                    indexes.push(i);
            }
            return indexes;
        }

        if(selectedColumn === 'Amount') {
            for(let i = 0; i < props.data.length; ++i) {
                if(props.data[i].amount === parseInt(selectedValue))
                    indexes.push(i);
            }
            return indexes;
        }

        if(selectedColumn === 'Distance') {
            for(let i = 0; i < props.data.length; ++i) {
                if(props.data[i].distance === parseInt(selectedValue))
                    indexes.push(i);
            }
            return indexes;
        }
    }

    const getIndexOfFilteredContainsData = () => {
        let result;
        let indexes = [];
        if(selectedColumn === 'Name') {
            result = props.data.map(d => d.name.toLowerCase().includes(selectedValue.toLowerCase()) && d.name.indexOf())
        }
        if(selectedColumn === 'Amount') {
            result = props.data.map(d => d.amount.toString().includes(selectedValue) && d.amount.toString().indexOf())
        }
        if(selectedColumn === 'Distance') {
            result = props.data.map(d => d.distance.toString().includes(selectedValue) && d.distance.toString().indexOf())
        }

        for(let i = 0; i < result.length; ++i) {
            if(result[i].toString() === '-1')
                indexes.push(i)
        }
        return indexes
    }

    const getIndexOfFilteredMoreData = () => {
        let result;
        let indexes = [];
        if(selectedColumn === 'Name') {
            result = props.data.map(d => d.name.toLowerCase() > selectedValue.toLowerCase())
        }
        if(selectedColumn === 'Amount') {
            result = props.data.map(d => d.amount > selectedValue)
        }
        if(selectedColumn === 'Distance') {
            result = props.data.map(d => d.distance > selectedValue)
        }

        for(let i = 0; i < result.length; ++i) {
            if(result[i] === true)
                indexes.push(i)
        }

        return indexes;
    }

    const getIndexOfFilteredLessData = () => {
        let result;
        let indexes = [];
        if(selectedColumn === 'Name') {
            result = props.data.map(d => d.name.toLowerCase() < selectedValue.toLowerCase())
        }
        if(selectedColumn === 'Amount') {
            result = props.data.map(d => d.amount < selectedValue)
        }
        if(selectedColumn === 'Distance') {
            result = props.data.map(d => d.distance < selectedValue)
        }

        for(let i = 0; i < result.length; ++i) {
            if(result[i] === true)
                indexes.push(i)
        }

        return indexes;
    }

    let columnValue;
    let conditionValue;

    const confirmSortInfo = () => {
        setFilter(true);
        const dataSelect = document.getElementById('columns');
        if(dataSelect) 
            columnValue = dataSelect.options[dataSelect.selectedIndex].value
            setSelectedColumn(columnValue)

        const conditionSelect = document.getElementById('condition');
        if(conditionSelect)
            conditionValue = conditionSelect.options[conditionSelect.selectedIndex].value
            setSelectedCondition(conditionValue)

        setSelectedValue(currentText)
    }

    return(
        <div class='container'>         
            <table class='table table-hover'>
                <thead>
                <tr>
                    <th>????????</th>
                    <th>????????????????</th>
                    <th>????????????????????</th>
                    <th>????????????????????</th>
                </tr>
                </thead>
                <tbody>
                    {!filter && props.currentPosts.map(data => (
                        <tr>
                            <td>{data.date.substring(0, data.date.indexOf('T'))}</td>
                            <td>{data.name}</td>
                            <td>{data.amount}</td>
                            <td>{data.distance}</td>
                        </tr>
                    ))}
                    {filter && selectedCondition === 'Equals' && getIndexOfFilteredEqualsData().map(index => (
                        <tr>
                            <td>{props.data[index].date.substring(0, props.data[index].date.indexOf('T'))}</td>
                            <td>{props.data[index].name}</td>
                            <td>{props.data[index].amount}</td>
                            <td>{props.data[index].distance}</td>
                        </tr>
                    ))}
                    {filter && selectedCondition === 'Contains' && getIndexOfFilteredContainsData().map(index => (
                        <tr>
                            <td>{props.data[index].date.substring(0, props.data[index].date.indexOf('T'))}</td>
                            <td>{props.data[index].name}</td>
                            <td>{props.data[index].amount}</td>
                            <td>{props.data[index].distance}</td>
                        </tr>
                    ))}
                    {filter && selectedCondition === 'More' && getIndexOfFilteredMoreData().map(index => (
                        <tr>
                            <td>{props.data[index].date.substring(0, props.data[index].date.indexOf('T'))}</td>
                            <td>{props.data[index].name}</td>
                            <td>{props.data[index].amount}</td>
                            <td>{props.data[index].distance}</td>
                        </tr>
                    ))}
                    {filter && selectedCondition === 'Less' && getIndexOfFilteredLessData().map(index => (
                        <tr>
                            <td>{props.data[index].date.substring(0, props.data[index].date.indexOf('T'))}</td>
                            <td>{props.data[index].name}</td>
                            <td>{props.data[index].amount}</td>
                            <td>{props.data[index].distance}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {!filter && <Pagination postsPerPage={props.postsPerPage} totalPosts={props.totalPosts} paginate={props.paginate} />}

            <div className={styles.title}>???????????????? ????????????????????</div>
            <div className={styles.filter}>
                <div>
                    <span className={styles.label}>??????????????:</span>
                    <select id='columns'>
                        <option value='Name' selected>????????????????</option>
                        <option value='Amount'>????????????????????</option>
                        <option value='Distance'>????????????????????</option>
                    </select>
                </div>

                <div>
                    <span className={styles.label}>??????????????:</span>
                    <select id='condition'>
                        <option value='Equals' selected>??????????</option>
                        <option value='Contains'>????????????????</option>
                        <option value='More'>????????????</option>
                        <option value='Less'>????????????</option>
                    </select>
                </div>

                <div>
                    <span className={styles.label}>????????????????:</span>
                    <input type='text' value={currentText} ref={ref} onChange={() => setCurrentText(ref.current.value)} />
                </div>
            </div>

            <div className={styles.buttons}>
                <div className={styles.confirmButton} onClick={confirmSortInfo}>Confirm</div>
                <div className={styles.resetButton} onClick={() => setFilter(false)}>Reset</div>
            </div>
        </div>
    );
}

export default Table;