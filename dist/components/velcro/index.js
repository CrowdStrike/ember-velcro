import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { modifier } from 'ember-modifier';
import VelcroModifier from '../../modifiers/velcro.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

function _initializerDefineProperty(e, i, r, l) {
  r && Object.defineProperty(e, i, {
    enumerable: r.enumerable,
    configurable: r.configurable,
    writable: r.writable,
    value: r.initializer ? r.initializer.call(l) : void 0
  });
}

function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}

function toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}

function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}

function _defineProperty(e, r, t) {
  return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}

function _applyDecoratedDescriptor(i, e, r, n, l) {
  var a = {};
  return Object.keys(n).forEach(function (i) {
    a[i] = n[i];
  }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) {
    return n(i, e, r) || r;
  }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a;
}

var TEMPLATE = precompileTemplate("{{yield (hash\n  hook=this.velcroHook\n  setHook=this.setHook\n  loop=(if this.hook (modifier this.velcroLoop\n    this.hook\n    flipOptions=@flipOptions\n    hideOptions=@hideOptions\n    middleware=@middleware\n    offsetOptions=@offsetOptions\n    placement=@placement\n    shiftOptions=@shiftOptions\n    strategy=@strategy\n    setVelcroData=this.setVelcroData\n  ))\n  data=this.velcroData\n)}}\n\n");

var _class, _descriptor, _descriptor2;
let Velcro = (_class = class Velcro extends Component {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty(this, "hook", _descriptor, this);
    _initializerDefineProperty(this, "velcroData", _descriptor2, this);
    _defineProperty(this, "setVelcroData", data => this.velcroData = data);
    _defineProperty(this, "setHook", element => {
      this.hook = element;
    });
    _defineProperty(this, "velcroHook", modifier(element => {
      this.setHook(element);
    }, {
      eager: false
    }));
    _defineProperty(this, "velcroLoop", VelcroModifier);
  } // set by VelcroModifier
}, _descriptor = _applyDecoratedDescriptor(_class.prototype, "hook", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return undefined;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "velcroData", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return undefined;
  }
}), _class);
setComponentTemplate(TEMPLATE, Velcro);

export { Velcro as default };
//# sourceMappingURL=index.js.map
