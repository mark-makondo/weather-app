import { jsPlumb } from 'jsplumb';

class JsPlumb {
  constructor(containerId) {
    this.jsPlumbObject = {
      jsPlumbInstance: null,
    };

    this.init(containerId);
  }

  init(containerId) {
    const instance = jsPlumb.getInstance({
      Container: containerId,
      PaintStyle: { stroke: '#c4c4c4', strokeWidth: 10, dashstyle: '2 2' },
      Connector: ['Bezier', { curviness: 30 }],
      Endpoint: ['Dot', { radius: 30 }],
      EndpointStyle: { fill: '#c4c4c4' },
    });
    this.set('jsPlumbInstance', instance);
    // instance.registerConnectionTypes({
    //   'connector-style': {
    //     dashstyle: '2 4',
    //     paintStyle: { stroke: 'gray', strokeWidth: 10, dashstyle: '5 2' },
    //     hoverPaintStyle: { stroke: '#f44336', strokeWidth: 10 },
    //   },
    // });
    console.log('initialized...');
  }

  /**
   *
   * @param {String} key
   * @returns
   */
  get(key) {
    return this.jsPlumbObject[key];
  }

  /**
   *
   * @param {String} key
   * @param {Any Type} value
   */
  set(key, value) {
    this.jsPlumbObject[key] = value;
  }

  /**
   *
   * @param {String} containerId
   */
  getContainer(containerId) {
    this.get('jsPlumbInstance').getContainer(containerId);
  }

  /**
   *
   * @param {String} elementId
   * @param {Boolean} containment
   */
  setElementDraggable(elementId) {
    this.get('jsPlumbInstance').draggable(elementId, { containment: true });
  }

  /**
   *
   * @param {String} elementId
   * returns current draggable state
   */
  toggleElementDraggable(elementId) {
    return this.get('jsPlumbInstance').toggleDraggable(elementId);
  }

  /**
   *
   * @param {String} elementId
   * returns current draggable state
   */
  addEndPoint(elementId, endPointOptions = {}) {
    return this.get('jsPlumbInstance').addEndpoint(elementId, endPointOptions);
  }

  connectEndPoints(sourceId, targetId) {
    return this.get('jsPlumbInstance').connect({
      source: sourceId,
      target: targetId,
      detachable: false,
      anchors: ['Right', 'Left'],
    });
  }

  removeAllEnpoints(elementId) {
    this.get('jsPlumbInstance').removeAllEndpoints(elementId);
  }
}

export default JsPlumb;
