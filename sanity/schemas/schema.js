// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Document types
import activity from './documents/activity';
import page from './documents/page';
import person from './documents/person';
import schedule from './documents/schedule';
import siteSettings from './documents/siteSettings';

// objects / components
import complexPortableText from './objects/complexPortableText';
import figure from './objects/figure';
import lesson from './objects/lesson';
import links from './objects/links';
import pagecontents from './objects/pagecontents';
import scheduleException from './objects/scheduleException';
import simplePortableText from './objects/simplePortableText';
import slideshow from './objects/slideshow';
import textbox from './objects/textbox';
import timetablePlaceholder from './objects/timetablePlaceholder';

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // pages
    activity,
    page,
    person,
    schedule,
    siteSettings,

    // objects
    complexPortableText,
    figure,
    lesson,
    links,
    pagecontents,
    scheduleException,
    simplePortableText,
    slideshow,
    textbox,
    timetablePlaceholder,
  ]),
})
