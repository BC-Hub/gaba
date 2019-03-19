// A plugin is a function that accepts a restricted require function.
function ({ require }) {

  // A plugin returns an object that represents the plugin's own interface.
  return {
    // The getApi method is required for plugins that want to provide an API via the user's provider.
    getApi,
  }

  function getApi (opts) {
    const { verifiedDomain } = opts
    return {
      foo: async () => 'bar',
    }
  }

}

