import React, { Fragment, useState } from "react";
import moment from "moment";
import { APPLICATION_STATUS, CLASS_STATUS, PAYMENT_STATUS, EXPORT_COLUMNS } from "utils/constants";
import { CSVLink } from 'react-csv';
import ReactExport from 'react-data-export';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

export default function Export({ source, dataSource }) {
    const currDate = moment().format("MM-DD-YYYY");
    const COLUMN_NAME = source.toUpperCase();
    // const [tableData, setTableData] = useState(dataSource);
    const [exportData, setExportData] = useState({excel: [], csv: {}});

    const getFileName = () => {
        switch(source){
            case 'payment': return `Payment-History_${currDate}`;
            case 'teacher': return `Teacher-Masterlist_${currDate}`;
            case 'class': return `Class-Masterlist_${currDate}`;
            case 'pricing': return `Pricing_${currDate}`;
            default: return `export-${currDate}`;
        }
    }

    const getValue = (value) => {
        switch(source){
            case 'payment': return Object.keys(PAYMENT_STATUS).find(key => PAYMENT_STATUS[key] === value);
            case 'teacher': return Object.keys(APPLICATION_STATUS).find(key => APPLICATION_STATUS[key] === value);
            case 'class': return Object.keys(CLASS_STATUS).find(key => CLASS_STATUS[key] === value);
            default: return value;
        } 
    }

    const getColumns = () => {
        return EXPORT_COLUMNS[COLUMN_NAME] ? EXPORT_COLUMNS[COLUMN_NAME] : [];
        // switch(source){
        //     case 'payment': return PAYMENT_EXPORT_COLUMNS;
        //     case 'teacher': return TEACHER_EXPORT_COLUMNS;
        //     case 'class': return CLASS_EXPORT_COLUMNS;
        //     case 'pricing': return PRICING_COLUMNS;
        //     default: return [];
        // }
    }

    const getCSVRows = () => {
        let columns = EXPORT_COLUMNS[COLUMN_NAME] ? EXPORT_COLUMNS[COLUMN_NAME] : [];
        // switch(source){
        //     case 'payment': 
        //         columns = PAYMENT_EXPORT_COLUMNS; break;
        //     case 'teacher': 
        //         columns = TEACHER_EXPORT_COLUMNS; break;
        //     case 'class': 
        //         columns = CLASS_EXPORT_COLUMNS; break;
        //     case 'pricing': 
        //         columns = PRICING_COLUMNS; break;
        //     default: return [];
        // }

        return dataSource.map((item, index) => {
            const obj = {...item};
            columns.forEach(({key, custom, type, format}) => {
                if(type === 'status'){
                    obj[key] = getValue(obj[key]);
                    return;
                }

                // if(type === 'date'){
                //     obj[key] = moment(obj[key]).format(format);
                //     return;
                // }
                if(type === 'datePricing'){
                    return obj[key] = obj[key] ? moment(new Date(obj[key])).format('MM/DD/YYYY hh:mm a') : "";
                }

                if(custom){
                    obj[key] = custom(obj, index);
                    return;
                }
                    
                obj[key] = obj[key] ? obj[key] : "";
            });

            return obj;
        });
    }

    const getExcelRows = () => {
        let columns = EXPORT_COLUMNS[COLUMN_NAME] ? EXPORT_COLUMNS[COLUMN_NAME] : [];
        // switch(source){
        //     case 'payment': 
        //         columns = PAYMENT_EXPORT_COLUMNS; break;
        //     case 'teacher': 
        //         columns = TEACHER_EXPORT_COLUMNS; break;
        //     case 'class': 
        //         columns = CLASS_EXPORT_COLUMNS; break;
        //     case 'pricing': 
        //         columns = PRICING_COLUMNS; break;
        //     default: return [];
        // }

        return dataSource.map((item, index) => {
            const obj = {...item};
            return columns.map(({key, custom, type, format, title}) => {
                if(type === 'status'){
                    return obj[key] = getValue(obj[key]);
                }

                // if(type === 'date'){
                //     return obj[key] = moment(obj[key]).format(format);
                // }
                if(type === 'datePricing'){
                    return obj[key] = obj[key] ? moment(new Date(obj[key])).format('MM/DD/YYYY hh:mm a') : "";
                }

                if(custom){
                    return obj[key] = custom(obj, index);
                }
                    
                return obj[key] = obj[key] ? obj[key] : "";
            });
        });
    }

    const handleExportExcel = async () => {
        // setTableData(dataSource);
        const exportConfig = [ 
            { 
                columns: getColumns(),  
                data: [ [{value: "Value"}] ] 
            }
        ];
        
        exportConfig[0].data = getExcelRows();

        await setExportData({
            excel: exportConfig,
            csv: {}
        });

        document.getElementById("excelButton").click();
    }

    const handleExportCSV = async () => {
        // setTableData(dataSource);
        const headers = getColumns().map(({title, key}) => ({label:title, key}));
        const data = getCSVRows();

        await setExportData({
            excel: [],
            csv: { headers, data }
        });

        document.getElementById("csvButton").click();
    }

    return (<Fragment>
            <div>
                <button className="btn btn-success w-100" onClick={handleExportCSV}>Export to CSV</button>
                <CSVLink id="csvButton" data={exportData.csv.data || []} headers={exportData.csv.headers || []} className="btn btn-success"
                 filename={`${getFileName()}.csv`} style={{ display:'none', color: "white" }}>
                    Export to CSV
                </CSVLink>
            </div>
            <div className="mt-2">
                <button className="btn btn-success w-100" onClick={handleExportExcel}>Export to Excel</button>
                <ExcelFile filename={getFileName()} element={<button id="excelButton" className="btn btn-success w-100" style={{display: 'none'}}>Export to Excel</button>}>
                    <ExcelSheet dataSet={exportData.excel} 
                    // name="Payment History"
                    name={getFileName()}
                    />
                </ExcelFile>
            </div>
    </Fragment>)
}