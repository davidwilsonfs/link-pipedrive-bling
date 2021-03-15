const Bottleneck = require('bottleneck/es5');

/**
 * Tranforma as requisições no sistema em requisições
 * que serão executadas em um determinado intervalo de tempo
 * e uma certa quantidade de requisições simultâneas suficientes
 * para evitar o limite rate de serviços externos
 * @param {Number} quant quantidade de requisições que serão realizadas ao mesmo tempo
 * @param {Number} time tempo em que as requisições serão realizadas
 * @param {Function} func função que será executada
 * @returns {Promise}
 */
exports.requestLimiter = (quant, time, func) => {
  const limiter = new Bottleneck({
    maxConcurrent: quant,
    minTime: time,
  });

  return limiter.wrap(func);
};

/**
 * Executa qualquer promise passivel de gerar algum erro no sistema
 * caso a mesma venha a gerar um error ele é tratado
 * @param {Promise} promise a promise que será tratada
 */
exports.promiseHandler = promise =>
  promise.then(result => ({ success: true, result })).catch(error => ({ success: false, error }));
