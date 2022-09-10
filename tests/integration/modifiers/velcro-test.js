import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { set } from '@ember/object';
import {
  addDataAttributes,
  resetTestingContainerDimensions,
} from '../velcro-test-helpers';

module('Integration | Modifier | velcro', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    resetTestingContainerDimensions();
  });

  test('it renders', async function (assert) {
    await render(hbs`
      <div id="reference">Reference</div>
      <div {{velcro "#reference"}}></div>
    `);

    assert.ok(true);
  });

  module('@placement', function () {
    set(this, 'addDataAttributes', addDataAttributes());
    test('has default value', async function (assert) {
      await render(hbs`
        <div id="velcro-reference">Velcro reference</div>
        <div id="velcro" {{velcro "#velcro-reference" middleware=(array this.addDataAttributes)}}>Velcro</div>
      `);

      assert.dom('#velcro ').hasAttribute('data-placement', 'bottom');
    });

    test('has named argument value', async function (assert) {
      await render(hbs`
        <div id="velcro-reference">Velcro reference</div>
        <div id="velcro" {{velcro "#velcro-reference" placement="bottom-start" middleware=(array this.addDataAttributes)}}>Velcro</div>
      `);

      assert.dom('#velcro ').hasAttribute('data-placement', 'bottom-start');
    });
  });

  module('@strategy', function () {
    set(this, 'addDataAttributes', addDataAttributes());
    test('has default value', async function (assert) {
      await render(hbs`
        <div id="velcro-reference">Velcro reference</div>
        <div id="velcro" {{velcro "#velcro-reference" middleware=(array this.addDataAttributes)}}>Velcro</div>
      `);

      assert.dom('#velcro ').hasAttribute('data-strategy', 'fixed');
    });

    test('has named argument value', async function (assert) {
      await render(hbs`
        <div id="velcro-reference">Velcro reference</div>
        <div id="velcro" {{velcro "#velcro-reference" strategy="absolute" middleware=(array this.addDataAttributes)}}>Velcro</div>
      `);

      assert.dom('#velcro ').hasAttribute('data-strategy', 'absolute');
    });
  });

  module('@offsetOptions', function () {
    test('can pass in distance', async function (assert) {
      let offsetDistance = 10;
      set(this, 'offsetDistance', offsetDistance);

      await render(hbs`
        {{!-- render 2 Velcro's side by side, pass one a distance offset and compare the top values --}}
        {{!-- template-lint-disable no-inline-styles --}}
        <div style="display: flex">
          <div>
            <div id="velcro-reference">Velcro reference</div>
            <div id="velcro1" {{velcro "#velcro-reference"}}>Velcro</div>
          </div>
          <div>
            <div>velcroReference</div>
            <div id="velcro2" {{velcro "#velcro-reference" offsetOptions=this.offsetDistance placement="bottom-start"}}>Velcro</div>
          </div>
        </div>
      `);

      let velcro1 = find('#velcro1');
      let velcro2 = find('#velcro2');

      assert.strictEqual(
        velcro1.getBoundingClientRect().top + offsetDistance,
        velcro2.getBoundingClientRect().top
      );
    });

    test('can pass in skidding', async function (assert) {
      let offsetSkidding = 10;
      set(this, 'offsetSkidding', { crossAxis: offsetSkidding });

      await render(hbs`
        {{!-- render 2 Velcro's atop the other, pass one a skidding offset and compare the left values --}}
        <div>
          <div id="velcro-reference">Velcro reference</div>
          <div id="velcro1" {{velcro "#velcro-reference"}}>Velcro</div>
        </div>
        <div>
          <div id="velcro-reference">velcroReference</div>
          <div id="velcro2" {{velcro "#velcro-reference" offsetOptions=this.offsetSkidding}}>Velcro</div>
        </div>
      `);

      let velcro1 = find('#velcro1');
      let velcro2 = find('#velcro2');

      assert.strictEqual(
        velcro1.getBoundingClientRect().left + offsetSkidding,
        velcro2.getBoundingClientRect().left
      );
    });
  });
});
