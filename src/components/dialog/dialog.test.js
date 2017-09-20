import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { Dialog as ReactToolboxDialog } from 'react-toolbox/lib/dialog';
import Dialog from './dialog';
import Send from '../send';

describe('Dialog', () => {
  let wrapper;
  const history = {
    location: {
      path: '/main/transactions/send',
      search: '',
    },
    push: sinon.spy(),
  };
  const dialogProps = {
    title: 'Send',
    childComponentProps: {
      name: 'send',
    },
    childComponent: Send,
  };

  beforeEach(() => {
    wrapper = shallow(<Dialog dialog={dialogProps} history={history}/>);
  });

  it('renders Dialog component from react-toolbox', () => {
    expect(wrapper.find(ReactToolboxDialog)).to.have.length(1);
  });

  it('renders a child component based on the path defined in history', () => {
    expect(wrapper.find(Send)).to.have.length(1);
  });

  it('allows to close the dialog', () => {
    wrapper.find('.x-button').simulate('click');
    expect(history.push).to.have.been.calledWith();
  });
});
