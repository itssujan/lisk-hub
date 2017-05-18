import lisk from 'lisk-js';

/**
 * This factory provides methods for communicating with peers. It exposses
 * sendRequestPromise method for requesting to available endpoint tot he active peer,
 * so we need to set the active peer using `setActive` method before using other methods
 *
 * @module app
 * @submodule Peers
 */
app.factory('Peers', ($timeout, $cookies, $location, $q, $rootScope) => {
  /**
   * The Peers factory constructor class
   *
   * @class Peers
   * @constructor
   */
  class Peers {
    constructor() {
      $rootScope.$on('syncTick', () => {
        if (this.active) this.check();
      });
    }

    /**
     * Deletaes the active peer
     *
     * @param {Boolean} active - defines if the function should delete the active peer
     *
     * @memberOf Peers
     * @method reset
     * @todo Since the usage of this function without passing active parameter
     *  doesn't perform any action, this function and its usecases must be revised.
     */
    reset(active) {
      if (active) {
        this.active = undefined;
      }
    }

    /**
     * User Lisk.js to set the active peer. if network is not passed
     * a peer will be selected in random base.
     * Also checks the status of the network
     *
     * @param {Object} [network] - The network to to be set as active
     *
     * @memberOf Peers
     * @method setActive
     */
    setActive(network) {
      let conf = { };
      if (network) {
        conf = network;
        if (network.address) {
          conf.node = network.address.split(':')[1].replace('//', '');
          conf.port = network.address.match(/:([0-9]{1,5})$/)[1];
          conf.ssl = network.address.split(':')[0] === 'https';
        }
        if (conf.testnet === undefined && conf.port !== undefined) {
          conf.testnet = conf.port === '7000';
        }
      }

      this.active = lisk.api(conf);
      this.check();
    }

    /**
     * Converts the callback-based peer.active.sendRequest to promise
     *
     * @param {String} api - The relative path of the endpoint
     * @param {any} [urlParams] - The parameters of the request
     * @returns {promise} Api call promise
     *
     * @memberOf Peer
     * @method sendRequestPromise
     */
    sendRequestPromise(api, urlParams) {
      const deferred = $q.defer();
      this.active.sendRequest(api, urlParams, (data) => {
        if (data.success) {
          return deferred.resolve(data);
        }
        return deferred.reject(data);
      });
      return deferred.promise;
    }

    /**
     * Gets the basic status of the client. and sets the online/ofline status
     *
     * @private
     * @memberOf Peer
     * @method check
     */
    check() {
      this.reset();

      this.sendRequestPromise('loader/status', {})
        .then(() => this.online = true)
        .catch(() => this.online = false);
    }
  }

  return new Peers();
});
