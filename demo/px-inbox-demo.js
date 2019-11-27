/*
Copyright (c) 2018, General Electric

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
/* Common imports */
/* Common demo imports */
/* Imports for this component */
/* Demo DOM module */
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import 'px-demo/px-demo-header.js';
import 'px-demo/px-demo-api-viewer.js';
import 'px-demo/px-demo-footer.js';
import 'px-demo/px-demo-configs.js';
import 'px-demo/px-demo-props.js';
import 'px-demo/px-demo-interactive.js';
import 'px-demo/px-demo-component-snippet.js';
import 'px-demo/px-demo-code-editor.js';
import './px-inbox-detail-demo.js';
import '../px-inbox.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  _template: html`
    <style>
      :host {
        --px-inbox-height: 500px;
      }
    </style>

    <!-- Header -->
    <px-demo-header module-name="px-inbox" description="A list/detail or “Inbox” view is appropriate when a user has a list of items, with detailed information or actions associated with each item, e.g. alerts associated with a fleet of assets, or open cases in a field service engineer’s queue. It allows the user to switch back and forth between items without losing the higher level overview, or having to navigate back and forth between screens repeatedly." mobile="" tablet="" desktop="">
    </px-demo-header>

    <!-- Interactive -->
    <px-demo-interactive>
      <!-- Configs -->
      <px-demo-configs slot="px-demo-configs" configs="[[configs]]" props="{{props}}" chosen-config="{{chosenConfig}}"></px-demo-configs>

      <!-- Props -->
      <px-demo-props slot="px-demo-props" props="{{props}}" config="[[chosenConfig]]"></px-demo-props>

      <!-- Code Editor -->
      <px-demo-code-editor slot="px-demo-code-editor" props="{{props}}"></px-demo-code-editor>

      <!-- Component ---------------------------------------------------------->
      <px-demo-component slot="px-demo-component" class="flex__item" style="height:500px;">
        <px-inbox list-items="{{props.listItems.value}}" selected-item-ref="{{selectedItemRef}}" disable-search="{{props.disableSearch.value}}" disable-sort="{{props.disableSort.value}}">
            <px-inbox-detail-demo title="{{selectedItemRef.title}}" severity="{{selectedItemRef.severity}}" is-selected="{{selectedItemRef.isSelected}}" alert-id="{{selectedItemRef.alertId}}" alert-source="{{selectedItemRef.alertSource}}" received-date-time="{{selectedItemRef.receivedDateTime}}" case-number="{{selectedItemRef.caseNumber}}" customer="{{selectedItemRef.customer}}" serial-number="{{selectedItemRef.serialNumber}}" dln-type="{{selectedItemRef.dlnType}}" model="{{selectedItemRef.model}}">
            </px-inbox-detail-demo>
        </px-inbox>
      </px-demo-component>
      <!-- END Component ------------------------------------------------------>

      <px-demo-component-snippet slot="px-demo-component-snippet" element-properties="{{props}}" element-name="px-inbox">
      </px-demo-component-snippet>
    </px-demo-interactive>

    <!-- API Viewer -->
    <px-demo-api-viewer source="px-inbox"></px-demo-api-viewer>

    <!-- Footer -->
    <px-demo-footer></px-demo-footer>
`,

  is: 'px-inbox-demo',

  properties: {

    /*
     * @property demoProps
     * @type {Object}
     */
    props: {
      type: Object,
      value: function(){ return this.demoProps; }
    },

    /**
     * An array of pre-configured `props` that can be used to provide the user
     * with a set of common examples. These configs will be made available
     * as a set of tabs the user can click that will automatically change
     * the `props` to specific values.
     *
     * @property demoProps
     * @type {Array}
     */
    configs: {
      type: Array,
      value: function(){
        return [
          { configName: "Basic",
            configReset: true
          }
        ]
      }
    },

    detailTitle: {
      type: String
    },

    detailSeverity: {
      type: String
    },

    detailIsSelected: {
      type: Boolean,
      value: false
    },
  },

  /**
   * A reference for `this.props`.
   */
  demoProps: {
    disableSearch: {
      type: Boolean,
      defaultValue: false,
      inputType: 'toggle'
    },
    disableSort: {
      type: Boolean,
      defaultValue: false,
      inputType: 'toggle'
    },
    listItems: {
      type: Array,
      defaultValue: [{
          "id":"1",
          "title":"CMS Cold Spot",
          "subtitle":"GT240182",
          "severity":"important",
          "date":"2016-10-05T01:29",
          "alertId":"749581",
          "alertSource":"Combustion",
          "receivedDateTime":"2016-10-05T08:00",
          "caseNumber":"127587937",
          "customer":"Dorothy Vaughan",
          "serialNumber":"GT769375",
          "dlnType":"DLN 2.6",
          "model":"7FA+e"
        },{
          "id":"2",
          "title":"Drum Level Anomaly",
          "subtitle":"Block 2",
          "severity":"",
          "date":"2016-10-04T01:27",
          "alertId":"249375",
          "alertSource":"Ignition",
          "receivedDateTime":"2016-10-04T03:30",
          "caseNumber":"857463748",
          "customer":"Mary Jackson",
          "serialNumber":"GE783556",
          "dlnType":"DLN 1.4",
          "model":"2MA+c"
        },{
          "id":"3",
          "title":"GT Vibration",
          "subtitle":"GT20145",
          "severity":"error",
          "date":"2016-10-03T01:21",
          "alertId":"749581",
          "alertSource":"Combustion",
          "receivedDateTime":"2016-10-03T01:50",
          "caseNumber":"5635221",
          "customer":"Katherine Johnson",
          "serialNumber":"DM528443",
          "dlnType":"DLN 1.0",
          "model":"9985A"
        },{
          "id":"4",
          "title":"Drum Level Anomaly Detected During Routine Service",
          "subtitle":"Block 4 of GT23183 of Power Plant XYZ",
          "severity":"information",
          "date":"2016-10-03T01:05",
          "alertId":"1999574",
          "alertSource":"Combustion",
          "receivedDateTime":"2016-10-03T10:03",
          "caseNumber":"44938",
          "customer":"Sally Ride",
          "serialNumber":"GT769375",
          "dlnType":"DLN 2.6",
          "model":"7FA+e"
        },{
          "id":"5",
          "title":"GT Trip",
          "subtitle":"GT23193",
          "severity":"important",
          "date":"2016-10-02T12:30",
          "alertId":"482001",
          "alertSource":"Combustion",
          "receivedDateTime":"2016-10-02T11:16",
          "caseNumber":"127587937",
          "customer":"Ilan Ramon",
          "serialNumber":"IL194800",
          "dlnType":"DLN 6",
          "model":"TTA3"
        },{
          "id":"6",
          "title":"CMS Hot Spot",
          "subtitle":"GT240183",
          "severity":"warning",
          "date":"2016-10-01T02:30",
          "alertId":"482000",
          "alertSource":"Combustion",
          "receivedDateTime":"2016-10-01T11:16",
          "caseNumber":"127587105",
          "customer":"Sally Ride",
          "serialNumber":"IL194893",
          "dlnType":"DLN 6",
          "model":"TTA3"
        }],
      inputType: 'code:JSON'
    },
    lightDomContent: {
      type: String,
      value: "Define or bind to detail view here"
    }
  }
});
