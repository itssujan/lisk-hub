import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
import configureMockStore from 'redux-mock-store';
import PropTypes from 'prop-types';
import Setting from './setting';
import accounts from '../../../test/constants/accounts';
import i18n from '../../i18n';

describe('Setting', () => {
  const history = {
    location: {
      pathname: '/main/voting',
    },
    push: sinon.spy(),
  };
  const settings = {
    autoLog: true,
    advancedMode: true,
  };

  const account = {
    isDelegate: false,
    address: '16313739661670634666L',
    username: 'lisk-hub',
  };
  const store = configureMockStore([])({
    account,
    activePeerSet: () => {},
    settings,
  });

  const options = {
    context: { store, history, i18n },
    childContextTypes: {
      store: PropTypes.object.isRequired,
      history: PropTypes.object.isRequired,
      i18n: PropTypes.object.isRequired,
    },
  };


  let clock;

  const t = key => key;
  let wrapper;

  const settingsUpdated = sinon.spy();
  const accountUpdated = sinon.spy();

  beforeEach(() => {
    wrapper = mount(
      <Setting store={store}
        settingsUpdated={settingsUpdated}
        accountUpdated={accountUpdated}
        settings={settings} t={t}/>, options);

    clock = sinon.useFakeTimers({
      toFake: ['setTimeout', 'clearTimeout', 'Date', 'setInterval'],
    });
  });

  afterEach(() => {
    clock.restore();
    i18n.changeLanguage('en');
  });

  it('should render "ReactSwipe" component', () => {
    expect(wrapper.find('ReactSwipe').exists()).to.equal(true);
  });

  it('should click on #carouselNav li change the slider', () => {
    wrapper.find('#carouselNav li').at(1).simulate('click');
    wrapper.update();
    clock.tick(500);
    wrapper.update();
    expect(wrapper.find('#carouselNav li').at(1).props().className).to.be.include('activeSlide');
  });

  it('should change advanceMode setting when clicking on checkbox', () => {
    wrapper.find('.advancedMode').at(0).find('input').simulate('change', { target: { checked: false, value: false } });
    clock.tick(300);
    wrapper.update();
    const expectedCallToSettingsUpdated = {
      advancedMode: !settings.advancedMode,
    };
    expect(settingsUpdated).to.have.been.calledWith(expectedCallToSettingsUpdated);
  });

  it('should change autolog setting when clicking on checkbox', () => {
    wrapper.find('.autoLog').at(0).find('input').simulate('change', { target: { checked: false, value: false } });
    clock.tick(300);
    wrapper.update();
    const expectedCallToSettingsUpdated = {
      autoLog: !settings.autoLog,
    };
    expect(settingsUpdated).to.have.been.calledWith(expectedCallToSettingsUpdated);
  });


  it('should update expireTime when updating autolog', () => {
    const accountToExpireTime = { ...account };
    const settingsToExpireTime = { ...settings };
    settingsToExpireTime.autoLog = false;
    accountToExpireTime.passphrase = accounts.genesis.passphrase;
    wrapper.setProps({ account: accountToExpireTime, settings: settingsToExpireTime });
    wrapper.update();

    wrapper.find('.autoLog').at(0).find('input').simulate('change', { target: { checked: true, value: true } });
    clock.tick(300);
    wrapper.update();

    const timeNow = Date.now();
    const expectedCallToAccountUpdated = {
      expireTime: timeNow,
    };
    expect(accountUpdated.getCall(0).args[0].expireTime)
      .to.be.greaterThan(expectedCallToAccountUpdated.expireTime);
  });

  // TODO: will be re-enabled when the functionality is re-enabled
  it.skip('should click on "languageSwitcher" change the language to "de"', () => {
    // const languageSpy = sinon.spy(i18n, 'changeLanguage');
    wrapper.find('.language-switcher .circle').simulate('click');
    wrapper.update();
    expect(i18n.language).to.be.equal('de');
  });

  // TODO: will be re-enabled when the functionality is re-enabled
  it.skip('should second click on "languageSwitcher" change the language to "en"', () => {
    wrapper.find('.language-switcher .circle').simulate('click');
    wrapper.update();
    expect(i18n.language).to.be.equal('de');
    wrapper.find('.language-switcher .circle').simulate('click');
    wrapper.update();
    expect(i18n.language).to.be.equal('en');
  });
});
