import './MultiCheck.css';

import React, { useState, useMemo, useCallback } from 'react';

export type Option = {
  label: string,
  value: string
}

/**
 * Notice:
 * 1. There should be a special `Select All` option with checkbox to control all passing options
 * 2. If columns > 1, the options should be placed from top to bottom in each column
 *
 * @param {string} label - the label text of this component
 * @param {Option[]} options - options
 * @param {string[]} values -  checked option values
 * @param {string[]} defaultValues - default checked option values
 * @param {number} columns - default value is 1
 * @param {Function} onChange - when checked options are changed,
 *                             they should be passed to outside
 */
type Props = {
  label?: string,
  options: Option[],
  columns?: number,
  values?: string[],
  defaultValues?: string[],
  onChange?: (options: Option[]) => void,
}

const MULTICHECK_SELECTED_ALL = 'MULTICHECK_SELECTED_ALL';
const MULTICHECK_SELECTED_ALL_OPTION = { 
  label: 'Selected All', 
  value: MULTICHECK_SELECTED_ALL
}

const MultiCheck: React.FunctionComponent<Props> = (props: Props): JSX.Element => {
  const { label, options, columns = 1, values, defaultValues, onChange } = props;
  
  // State
  const [ selectedValues, setSelectedValues ] = useState( defaultValues || [] );
  
  // memo-callback
  // getRenderValues-fn
  const getRenderValues = useCallback((currentValues: string[], options: Option[])=>{
    let isSelectedAll = true;
    options.forEach(option => {
      if(!currentValues.find(value=> value === option.value)){
        isSelectedAll = false;
      }
    })
    if(isSelectedAll){
      return [MULTICHECK_SELECTED_ALL].concat(currentValues);
    }
    return currentValues;
  },[])

  // handleCheckedChange
  const handleCheckedChange = (value: string) => {
    let currentValues = values || selectedValues;
    const currentSelectedOptions: Option[] = [];
    if(value === MULTICHECK_SELECTED_ALL) {
      // 全选状态改变单独处理
      if(currentValues.length === options.length){
        currentValues = [];
      }else{
        currentValues = options.map((option: Option) => option.value);
      }
    }else{
      const valueKey = currentValues.indexOf(value);
      if(valueKey === -1){
        currentValues.push(value);
      }else{
        currentValues.splice(valueKey, 1);
      }
    }
    currentValues.forEach((selectedOptionValue: string)=>{
      if(selectedOptionValue !== MULTICHECK_SELECTED_ALL){
        const findOne = options.find((option: Option)=>option.value === selectedOptionValue);
        if(findOne){
          currentSelectedOptions.push(findOne);
        }
      }
    })
    if(!values){
      setSelectedValues([...currentValues]);
    } 
    onChange && onChange(currentSelectedOptions)
  }

  // memo-ui
  // render-labelUI
  const labelUI = useMemo(() => {
    if( label || label === '' ){
      return (
        <div className='MultiCheck-label-wrap'>
          {label}
        </div>
      );
    }
    return null;
  }, [label])

  // render-options
  const optionsUI = useMemo(() => {
    const allOptions = [MULTICHECK_SELECTED_ALL_OPTION].concat(options);
    const currentValues = getRenderValues(values || selectedValues, options);
    const mapOptionColumnList = [];
    const subGroupLength = Math.ceil(allOptions.length/columns);
    let endIndex = 0;
    for(let i = 0; i < allOptions.length; i = endIndex){
       endIndex = i + subGroupLength;
       if(endIndex > allOptions.length){
        endIndex = allOptions.length;
       }
       mapOptionColumnList.push(allOptions.slice(i, endIndex));
    }
    const allItems = mapOptionColumnList.map((columnItem, columnIndex) => {
      const optionsItems = columnItem.map(item => {
        const { label, value } = item;
        return (
          <div className='MultiCheck-option-wrap' key={value}>
            <div>
              <input 
                type='checkbox' 
                value={value} 
                checked={currentValues.includes(value)}
                onChange={()=>handleCheckedChange(value)}
              />
            </div>
            <div>
              { label }
            </div>
          </div>
        )
      })
      return (
        <div className="MultiCheck-column-wrap" key={columnIndex}>
          { optionsItems }
        </div>
      )
    });
    return allItems;
  }, [columns, options, values, selectedValues])

  return (
    <div className='MultiCheck' >
      {labelUI}
      <div className='MultiCheck-content-wrap'>
        <div className='MultiCheck-content'>
          {optionsUI}
        </div>
      </div>
    </div>
  )
}

export default MultiCheck;
