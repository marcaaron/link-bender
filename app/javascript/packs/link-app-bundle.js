import ReactOnRails from 'react-on-rails';

import LinkApp from '../bundles/LinkApp/components/Root';

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  LinkApp,
});
