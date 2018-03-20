const styles = {
  step: {
    fontSize: '15px',
    borderRadius: '0',
    color: '#000',
    textAlign: 'left',
    width: '280px',
    header: {
      borderBottom: 'none',
      fontFamily: 'gilroy,Open Sans,sans-serif',
      fontSize: '18px',
      fontWeight: '400',
    },
    skip: {
      color: '#74869B',
    },
    close: {
      display: 'none',
    },
    button: {
      backgroundColor: '#fff',
      color: '#ED4537',
    },
  },
  intro: {
    fontSize: '15px',
    borderRadius: '0',
    color: '#000',
    textAlign: 'center',
    width: '486px',
    arrow: {
      display: 'none',
    },
    main: {
      padding: '10px 90px 30px',
    },
    header: {
      borderBottom: 'none',
      fontFamily: 'gilroy,Open Sans,sans-serif',
      fontSize: '28px',
      padding: '80px 90px 20px',
    },
    skip: {
      color: '#74869B',
      float: 'none',
      margin: '0',
    },
    footer: {
      textAlign: 'center',
      padding: '0px 90px 0px',
    },
    close: {
      display: 'none',
    },
    button: {
      backgroundImage: 'linear-gradient(-224deg, #FF6236 14%, #C80039 100%)',
      color: '#fff',
      height: '60px',
      width: '85%',
      margin: '20px 0px 40px 0px',
    },
  },
};

export default [
  {
    title: 'Lets start with a quick onboarding',
    text: 'Take a quick tour to see how the Lisk App works.',
    selector: '#app',
    position: 'bottom',
    style: styles.intro,
  },
  {
    title: '10 minutes session timeout',
    text: 'After 10 minutes of inactivity time we log you out to prevent others from accessing your Lisk ID. ' +
'Will be reset as soon you get active. \n' +
'Or you reset timer by clicking on the clock symbol.',
    selector: '.account-timer',
    position: 'bottom',
    style: styles.step,
  },
  {
    title: 'Keep the overview',
    text: 'Once you create an address you will be able to access all relevant stats and address information here.',
    selector: '#dashboard',
    position: 'right',
    style: styles.step,
  },
  {
    title: 'Send LSK',
    text: 'All activities are secure and only executable by your private passphrase you got when you create an address.',
    selector: '#transactions',
    position: 'right',
    style: styles.step,
  },
  {
    title: 'Explore in real time',
    text: 'Search and found addresses and transactions.Transparency is what differentiate decentralized networks from others.',
    selector: '#explorer',
    position: 'right',
    style: styles.step,
  },
  {
    title: 'Manage your application',
    text: 'Soon you will be able to use and manage your sidechain application by this website interface here.',
    selector: '#sidechains',
    position: 'right',
    style: styles.step,
  },
  {
    title: 'More opportunities',
    text: 'Change account settings easily.\n Repeat the onboarding here.',
    selector: '.more-menu',
    position: 'right',
    style: styles.step,
  },
];