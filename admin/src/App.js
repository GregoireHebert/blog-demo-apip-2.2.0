import React from 'react';
import { HydraAdmin } from '@api-platform/admin';
import { API_ENTRYPOINT } from './services/constants';
import apiDocumentationParser from './services/api-documentation-parser';

export default () => <HydraAdmin apiDocumentationParser={apiDocumentationParser} entrypoint={API_ENTRYPOINT}/>;
