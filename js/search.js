/* global instantsearch */

app({
    appId: 'IB8DPJFQ2B',
    apiKey: 'bf34ca3f3483d4bc90e2098b95a0bbe2',
    indexName: 'technomachy',
    searchParameters: {
      hitsPerPage: 10,
      distinct: true,
      facetingAfterDistinct: true,
      filters: 'type:"document"'
    },
  });
  
  function app(opts) {
    const search = instantsearch({
      appId: opts.appId,
      apiKey: opts.apiKey,
      indexName: opts.indexName,
      urlSync: true,
      searchFunction: opts.searchFunction,
      searchParameters: opts.searchParameters,
    });
  
    search.addWidget(
      instantsearch.widgets.searchBox({
        container: '#search-input',
        placeholder: 'Search for posts',
        poweredBy: true,
      })
    );
  
    search.addWidget(
      instantsearch.widgets.hits({
        container: '#hits',
        templates: {
          item: getTemplate('hit'),
          empty: getTemplate('no-results'),
        },
      })
    );
  
    search.addWidget(
      instantsearch.widgets.stats({
        container: '#stats',
      })
    );
  
    search.addWidget(
      instantsearch.widgets.sortBySelector({
        container: '#sort-by',
        autoHideContainer: true,
        indices: [
          {
            name: opts.indexName,
            label: 'Most relevant',
          },
          {
            name: `${opts.indexName}_date_asc`,
            label: 'Older first',
          },
          {
            name: `${opts.indexName}_date_desc`,
            label: 'Newest first',
          },
        ],
      })
    );
  
    search.addWidget(
      instantsearch.widgets.pagination({
        container: '#pagination',
        scrollTo: '#search-input',
      })
    );
  
   search.addWidget(
      instantsearch.widgets.refinementList({
        container: '#tags',
        attributeName: 'tags',
        operator: 'or',
        templates: {
          header: getHeader('Tags'),
        },
      })
    );
  /*
    search.addWidget(
      instantsearch.widgets.refinementList({
        container: '#brand',
        attributeName: 'brand',
        operator: 'or',
        searchForFacetValues: {
          placeholder: 'Search for brands',
          templates: {
            noResults: '<div class="sffv_no-results">No matching brands.</div>',
          },
        },
        templates: {
          header: getHeader('Brand'),
        },
      })
    );
  
    search.addWidget(
      instantsearch.widgets.rangeSlider({
        container: '#price',
        attributeName: 'price',
        templates: {
          header: getHeader('Price'),
        },
      })
    );
  
    search.addWidget(
      instantsearch.widgets.refinementList({
        container: '#type',
        attributeName: 'type',
        operator: 'and',
        templates: {
          header: getHeader('Type'),
        },
      })
    );
    */
  
    search.start();
  }
  
  function getTemplate(templateName) {
    return document.querySelector(`#${templateName}-template`).innerHTML;
  }
  
  function getHeader(title) {
    return `<h5>${title}</h5>`;
  }
  