import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { modifier } from 'ember-modifier';
import VelcroModifier from '../../modifiers/velcro.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

function _initializerDefineProperty(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
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

function _defineProperty(obj, key, value) {
  key = toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object.keys(descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;
  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }
  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);
  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }
  if (desc.initializer === void 0) {
    Object.defineProperty(target, property, desc);
    desc = null;
  }
  return desc;
}

var TEMPLATE = precompileTemplate("{{yield (hash\n  hook=this.velcroHook\n  loop=(if this.hook (modifier this.velcroLoop\n    this.hook\n    flipOptions=@flipOptions\n    hideOptions=@hideOptions\n    middleware=@middleware\n    offsetOptions=@offsetOptions\n    placement=@placement\n    shiftOptions=@shiftOptions\n    strategy=@strategy\n    setVelcroData=this.setVelcroData\n  ))\n  data=this.velcroData\n)}}\n\n");

var _class, _descriptor, _descriptor2;
let Velcro = (_class = class Velcro extends Component {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty(this, "hook", _descriptor, this);
    _initializerDefineProperty(this, "velcroData", _descriptor2, this);
    _defineProperty(this, "setVelcroData", data => this.velcroData = data);
    _defineProperty(this, "velcroHook", modifier(element => {
      this.hook = element;
    }, {
      eager: false
    }));
    _defineProperty(this, "velcroLoop", VelcroModifier);
  } // set by VelcroModifier
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "hook", [tracked], {
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
})), _class);
setComponentTemplate(TEMPLATE, Velcro);

export { Velcro as default };
//# sourceMappingURL=index.js.map
