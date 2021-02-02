import React from 'react';
import Enzyme from "./enzyme.config";
import MultiCheck, { Option }  from './MultiCheck';

// TODO more tests


const { mount } = Enzyme;


const options: Option[] = [
  {label: 'aaa', value: '111',},
  {label: 'bbb', value: '222',},
  {label: 'ccc', value: '333',},
  {label: 'ddd', value: '444',},
  {label: 'eee', value: '555',},
  {label: 'fff', value: '666',},
  {label: 'ggg', value: '777',},
  {label: 'hhh', value: '888',},
  {label: 'iii', value: '999',},
]

describe('MultiCheck', () => {
  beforeAll(()=>{
    // do something before all test here ~ 
  })
  afterAll(()=>{
    // do something after all test here ~ 
  })
  describe('initialize', () => {
    it('renders the label if label provided', () => {
      // TODO
      const wrapper = mount(<MultiCheck  options={options} label="test label~"/>)
      expect(wrapper.render()).toMatchSnapshot();
      expect(wrapper.find('.MultiCheck-label-wrap')).toHaveLength(1);
      expect(wrapper.find('.MultiCheck-label-wrap').html()).toEqual('<div class=\"MultiCheck-label-wrap\">test label~</div>');
      // expect(wrapper.find)
    });
  });
});

// Sorry, I don't have time to write more unit tests. You can directly ask me the test case ideas.
// 抱歉，我没有时间去写更多的单元测试。你可以直接问我测试用例思路。
// author:  Xinyu Wang (melodyWxy)