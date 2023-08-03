import { config, g } from '@grafbase/sdk';

g.model('User', {
  name: g.string(),
  email: g.email(),
});

export default config({ schema: g });
