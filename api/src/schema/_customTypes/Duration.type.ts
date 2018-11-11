import { GraphQLScalarType } from 'graphql';
import { EmptyStringError } from '../../utils/errors';
import { timeToSeconds } from '../../utils/hh-mm-ss';

function isString(value) {
  if (typeof(value) === 'string' && value.trim().length > 0) {
    return timeToSeconds(value);
  }

  throw new EmptyStringError();
}

export default new GraphQLScalarType({
  name: 'Duration',
  description: 'Converts time of type String "0:00" to Int "seconds"',
  parseValue: isString,
  serialize: isString,
  parseLiteral: isString,
});
