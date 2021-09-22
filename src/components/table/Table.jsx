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
        let result;
        if(selectedColumn === 'Date') {
            result = props.data.map(d => d.date.substring(0, d.date.indexOf('T'))).indexOf(selectedValue)
        }
        if(selectedColumn === 'Name') {
            result = props.data.map(d => d.name).indexOf(selectedValue)
        }
        if(selectedColumn === 'Amount') {
            result = props.data.map(d => d.amount).indexOf(parseInt(selectedValue))
        }
        if(selectedColumn === 'Distance') {
            result = props.data.map(d => d.distance).indexOf(parseInt(selectedValue))
        }
        return result
    }

    const getIndexOfFilteredContainsData = () => {
        let result;
        let indexes = [];
        if(selectedColumn === 'Date') {
            result = props.data.map(d => d.date.substring(0, d.date.indexOf('T')).includes(selectedValue) && d.date.indexOf())
        }
        if(selectedColumn === 'Name') {
            result = props.data.map(d => d.name.includes(selectedValue) && d.name.indexOf())
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
        if(selectedColumn === 'Date') {
            result = props.data.map(d => d.date.substring(0, d.date.indexOf('T')) > selectedValue)
        }
        if(selectedColumn === 'Name') {
            result = props.data.map(d => d.name > selectedValue)
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
        if(selectedColumn === 'Date') {
            result = props.data.map(d => d.date.substring(0, d.date.indexOf('T')) < selectedValue)
        }
        if(selectedColumn === 'Name') {
            result = props.data.map(d => d.name < selectedValue)
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
                    <th>Дата</th>
                    <th>Название</th>
                    <th>Количество</th>
                    <th>Расстояние</th>
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
                    {filter && selectedCondition === 'Equals' && props.data[getIndexOfFilteredEqualsData()] &&                      
                        <tr>
                            <td>{props.data[getIndexOfFilteredEqualsData()].date.substring(0, props.data[getIndexOfFilteredEqualsData()].date.indexOf('T'))}</td>
                            <td>{props.data[getIndexOfFilteredEqualsData()].name}</td>
                            <td>{props.data[getIndexOfFilteredEqualsData()].amount}</td>
                            <td>{props.data[getIndexOfFilteredEqualsData()].distance}</td>
                        </tr>
                    }
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

            <Pagination postsPerPage={props.postsPerPage} totalPosts={props.totalPosts} paginate={props.paginate} />

            <div className={styles.title}>Настрйки сортировки</div>
            <div className={styles.filter}>
                <div>
                    <span className={styles.label}>Колонка:</span>
                    <select id='columns'>
                        <option value='Date' selected>Дата</option>
                        <option value='Name'>Название</option>
                        <option value='Amount'>Количество</option>
                        <option value='Distance'>Расстояние</option>
                    </select>
                </div>

                <div>
                    <span className={styles.label}>Условие:</span>
                    <select id='condition'>
                        <option value='Equals' selected>Равно</option>
                        <option value='Contains'>Содержит</option>
                        <option value='More'>Больше</option>
                        <option value='Less'>Меньше</option>
                    </select>
                </div>

                <div>
                    <span className={styles.label}>Значение:</span>
                    <input type='text' value={currentText} ref={ref} onChange={() => setCurrentText(ref.current.value)} />
                </div>
            </div>

            <div className={styles.confirmButton} onClick={confirmSortInfo}>Confirm</div>
        </div>
    );
}

export default Table;