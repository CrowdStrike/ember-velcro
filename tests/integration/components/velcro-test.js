import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

function velcroElement() {
  return find('#velcro');
}

module('Integration | Component | velcro', function (hooks) {
  setupRenderingTest(hooks);

  test('it creates a popper', async function (assert) {
    await render(hbs`
      <Velcro as |velcroTarget velcro|>
        <div {{velcroTarget}}>VelcroTarget</div>
        <div id="velcro" {{velcro}}>Velcro</div>
      </Velcro>
    `);

    assert.dom(velcroElement()).hasAttribute('data-popper-placement');
  });

  module('placement', function () {
    test('has default value', async function (assert) {
      await render(hbs`
        <Velcro as |velcroTarget velcro|>
          <div {{velcroTarget}}>VelcroTarget</div>
          <div id="velcro" {{velcro}}>Velcro</div>
        </Velcro>
      `);

      assert.strictEqual(velcroElement().dataset.popperPlacement, 'bottom');
    });

    test('has argument value', async function (assert) {
      this.placement = 'bottom-start';

      await render(hbs`
        <Velcro @placement={{this.placement}} as |velcroTarget velcro|>
          <div {{velcroTarget}}>VelcroTarget</div>
          <div id="velcro" {{velcro}}>Velcro</div>
        </Velcro>
      `);

      assert.strictEqual(
        velcroElement().dataset.popperPlacement,
        this.placement
      );
    });
  });

  module('strategy', function () {
    test('has default value', async function (assert) {
      await render(hbs`
        <Velcro as |velcroTarget velcro|>
          <div {{velcroTarget}}>VelcroTarget</div>
          <div id="velcro" {{velcro}}>Velcro</div>
        </Velcro>
      `);
      assert.dom(velcroElement()).hasStyle({ position: 'absolute' });
    });

    test('has argument value', async function (assert) {
      await render(hbs`
        <Velcro @strategy="fixed" as |velcroTarget velcro|>
          <div {{velcroTarget}}>VelcroTarget</div>
          <div id="velcro" {{velcro}}>Velcro</div>
        </Velcro>
      `);

      assert.dom(velcroElement()).hasStyle({ position: 'fixed' });
    });
  });

  module('offset', function () {
    test('can pass in skidding', async function (assert) {
      this.offsetSkidding = 10;

      await render(hbs`
        {{!-- render 2 Velcro's atop the other, pass one a skidding offset and compare the left values --}}
        <Velcro @placement="bottom-start" as |velcroTarget velcro|>
          <div {{velcroTarget}}>VelcroTarget</div>
          <div id="velcro1" {{velcro}}>Velcro</div>
        </Velcro>
        <Velcro @offsetSkidding={{this.offsetSkidding}} @placement="bottom-start" as |velcroTarget velcro|>
          <div {{velcroTarget}}>VelcroTarget</div>
          <div id="velcro2" {{velcro}}>Velcro</div>
        </Velcro>
      `);

      let velcro1 = find('#velcro1');
      let velcro2 = find('#velcro2');

      // reset test container scale so values returned by
      // getBoundingClientRect are accurate
      document.querySelector('#ember-testing').style.transform = 'scale(1)';
      assert.strictEqual(
        velcro1.getBoundingClientRect().left + this.offsetSkidding,
        velcro2.getBoundingClientRect().left
      );
    });

    test('can pass in distance', async function (assert) {
      this.offsetDistance = 10;

      await render(hbs`
        {{!-- render 2 Velcro's side by side, pass one a distance offset and compare the values --}}
        {{!-- template-lint-disable no-inline-styles --}}
        <div style="display: flex">
          <Velcro as |velcroTarget velcro|>
            <div {{velcroTarget}}>VelcroTarget</div>
            <div id="velcro1" {{velcro}}>Velcro</div>
          </Velcro>
          <Velcro @offsetDistance={{this.offsetDistance}} as |velcroTarget velcro|>
            <div {{velcroTarget}}>VelcroTarget</div>
            <div id="velcro2" {{velcro}}>Velcro</div>
          </Velcro>
        </div>
      `);

      let velcro1 = find('#velcro1');
      let velcro2 = find('#velcro2');

      // reset test container scale so values returned by
      // getBoundingClientRect are accurate
      document.querySelector('#ember-testing').style.transform = 'scale(1)';
      assert.strictEqual(
        velcro1.getBoundingClientRect().top + this.offsetDistance,
        velcro2.getBoundingClientRect().top
      );
    });
  });

  test('it calls onFirstUpdate', async function (assert) {
    let onFirstUpdateCalled = false;
    this.onFirstUpdate = () => (onFirstUpdateCalled = true);

    await render(hbs`
      <Velcro @onFirstUpdate={{this.onFirstUpdate}} as |velcroTarget velcro|>
        <div {{velcroTarget}}>VelcroTarget</div>
        <div {{velcro}}>Velcro</div>
      </Velcro>
    `);

    assert.true(onFirstUpdateCalled);
  });

  module('modifiers', function () {
    test('can pass in custom modifier', async function (assert) {
      let modifierCalled = false;

      let modifier = {
        name: 'testModifier',
        enabled: true,
        phase: 'main',
        fn() {
          modifierCalled = true;
        },
      };

      this.modifiers = [modifier];

      await render(hbs`
        <Velcro @modifiers={{this.modifiers}} as |velcroTarget velcro|>
          <div {{velcroTarget}}>VelcroTarget</div>
          <div id="velcro" {{velcro}}>Velcro</div>
        </Velcro>
      `);

      assert.true(modifierCalled);
    });

    test('can override default offset modifier', async function (assert) {
      let offsetModifier = {
        name: 'offset',
        options: {
          offset: () => {
            return [10];
          },
        },
      };

      this.modifiers = [offsetModifier];

      await render(hbs`
        {{!-- render 2 Velcro's atop the other, pass one a custom offset modifier and compare the left values --}}
        <Velcro @placement="bottom-start" as |velcroTarget velcro|>
          <div {{velcroTarget}}>VelcroTarget</div>
          <div id="velcro1" {{velcro}}>Velcro</div>
        </Velcro>
        <Velcro @modifiers={{this.modifiers}} @placement="bottom-start" as |velcroTarget velcro|>
          <div {{velcroTarget}}>VelcroTarget</div>
          <div id="velcro2" {{velcro}}>Velcro</div>
        </Velcro>
      `);

      let velcro1 = find('#velcro1');
      let velcro2 = find('#velcro2');

      assert.notStrictEqual(
        velcro1.getBoundingClientRect().left,
        velcro2.getBoundingClientRect().left
      );
    });
  });

  module('resizing', function () {
    test("velcro is repositioned if velcroTarget's size changes", async function (assert) {
      this.velcroTargetWidth = '100%';

      await render(hbs`
        <Velcro as |velcroTarget velcro|>
          {{!-- template-lint-disable no-inline-styles --}}
          {{!-- template-lint-disable style-concatenation --}}
          <div style="width: {{this.velcroTargetWidth}}"> {{velcroTarget}}>VelcroTarget</div>
          <div id="velcro" {{velcro}}>Velcro</div>
        </Velcro>
      `);

      let velcroOffsetLeft1 = find('#velcro').getBoundingClientRect().left;

      this.velcroTargetWidth = '200px';

      await render(hbs`
        <Velcro as |velcroTarget velcro|>
          {{!-- template-lint-disable no-inline-styles --}}
          {{!-- template-lint-disable style-concatenation --}}
          <div style="width: {{this.velcroTargetWidth}}" {{velcroTarget}}>VelcroTarget</div>
          <div id="velcro" {{velcro}}>Velcro</div>
        </Velcro>
      `);

      let velcroOffsetLeft2 = find('#velcro').getBoundingClientRect().left;

      assert.notStrictEqual(velcroOffsetLeft1, velcroOffsetLeft2);
    });

    test("velcro is resized if it's content changes", async function (assert) {
      await render(hbs`
        <Velcro as |velcroTarget velcro|>
          <div {{velcroTarget}}>VelcroTarget</div>
          <div id="velcro" {{velcro}}>Velcro</div>
        </Velcro>
      `);

      let velcroOffsetWidth1 = find('#velcro').getBoundingClientRect().width;

      await render(hbs`
        <Velcro as |velcroTarget velcro|>
          <div {{velcroTarget}}>VelcroTarget</div>
          <div id="velcro" {{velcro}}>A bigger Velcro</div>
        </Velcro>
      `);

      let velcroOffsetLeft2 = find('#velcro').getBoundingClientRect().width;

      assert.notStrictEqual(velcroOffsetWidth1, velcroOffsetLeft2);
    });
  });
});
