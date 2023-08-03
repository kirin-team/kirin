import { GrafbaseSchema } from '@grafbase/sdk/dist/src/grafbase-schema';

export default function user(g: GrafbaseSchema) {
  g.model('User', {
    name: g.string(),
    email: g.email(),
  });
}
