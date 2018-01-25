import parseHydraDocumentation from '@api-platform/api-doc-parser/lib/hydra/parseHydraDocumentation';
import apiRichTextDenormalizer from '../api/denormalizers/api-richtext-denormalizer';
import relationDenormalizer from '../api/denormalizers/relation-denormalizer';

export default entrypoint => parseHydraDocumentation(entrypoint)
.then(
    ({ api }) => {
        api = apiRichTextDenormalizer(api);
        api = relationDenormalizer(api);

        return { api };
    }
);