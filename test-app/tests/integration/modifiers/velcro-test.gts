import { render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import {
  addDataAttributes,
  findElement,
  resetTestingContainerDimensions,
} from '../velcro-test-helpers';

import { velcro } from 'ember-velcro'

module('Integration | Modifier | velcro', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    resetTestingContainerDimensions();
  });

  test('it renders', async function (assert) {
    await render(<template>
      <div id="reference">Reference</div>
      <div {{velcro "#reference"}}></div>
    </template>);

    assert.ok(true);
  });

  module('@placement', function () {
    let middleware = [addDataAttributes()];

    test('has default value', async function (assert) {
      await render(<template>
        <div id="velcro-reference">Velcro reference</div>
        <div id="velcro" {{velcro "#velcro-reference" middleware=middleware}}>Velcro</div>
      </template>);

      assert.dom('#velcro ').hasAttribute('data-placement', 'bottom');
    });

    test('has named argument value', async function (assert) {
      await render(<template>
        <div id="velcro-reference">Velcro reference</div>
        <div id="velcro" {{velcro "#velcro-reference" placement="bottom-start" middleware=middleware}}>Velcro</div>
      </template>);

      assert.dom('#velcro ').hasAttribute('data-placement', 'bottom-start');
    });
  });

  module('@strategy', function () {
    let middleware = [addDataAttributes()];

    test('has default value', async function (assert) {
      await render(<template>
        <div id="velcro-reference">Velcro reference</div>
        <div id="velcro" {{velcro "#velcro-reference" middleware=middleware}}>Velcro</div>
      </template>);

      assert.dom('#velcro ').hasAttribute('data-strategy', 'fixed');
    });

    test('has named argument value', async function (assert) {
      await render(<template>
        <div id="velcro-reference">Velcro reference</div>
        <div id="velcro" {{velcro "#velcro-reference" strategy="absolute" middleware=middleware}}>Velcro</div>
      </template>);

      assert.dom('#velcro ').hasAttribute('data-strategy', 'absolute');
    });
  });

  module('@offsetOptions', function () {
    test('can pass in distance', async function (assert) {
      let offsetDistance = 10;

      await render(<template>
        {{!-- render 2 Velcro's side by side, pass one a distance offset and compare the top values --}}
        {{!-- template-lint-disable no-inline-styles --}}
        <div style="display: flex">
          <div>
            <div id="velcro-reference">Velcro reference</div>
            <div id="velcro1" {{velcro "#velcro-reference"}}>Velcro</div>
          </div>
          <div>
            <div>velcroReference</div>
            <div id="velcro2" {{velcro "#velcro-reference" offsetOptions=offsetDistance placement="bottom-start"}}>Velcro</div>
          </div>
        </div>
      </template>);

      let velcro1 = findElement('#velcro1');
      let velcro2 = findElement('#velcro2');

      assert.strictEqual(
        velcro1.getBoundingClientRect().top + offsetDistance,
        velcro2.getBoundingClientRect().top
      );
    });

    test('can pass in skidding', async function (assert) {
      let offsetSkidding = 10;

      let offsetOptions =  { crossAxis: offsetSkidding };

      await render(<template>
        {{!-- render 2 Velcro's atop the other, pass one a skidding offset and compare the left values --}}
        <div>
          <div id="velcro-reference">Velcro reference</div>
          <div id="velcro1" {{velcro "#velcro-reference"}}>Velcro</div>
        </div>
        <div>
          <div id="velcro-reference">velcroReference</div>
          <div id="velcro2" {{velcro "#velcro-reference" offsetOptions=offsetOptions}}>Velcro</div>
        </div>
      </template>);

      let velcro1 = findElement('#velcro1');
      let velcro2 = findElement('#velcro2');

      assert.strictEqual(
        velcro1.getBoundingClientRect().left + offsetSkidding,
        velcro2.getBoundingClientRect().left
      );
    });
  });
});
