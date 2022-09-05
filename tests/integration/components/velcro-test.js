import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | velcro', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`
      <Velcro as |velcroReference velcroElement velcroData|>
        <div id="reference" {{velcroReference}} style="width: 200px; height: 40px">
          {{velcroData.rects.reference.width}}
          {{velcroData.rects.reference.height}}
        </div>
        <div id="floating" {{velcroElement}} style="width: 200px; height: 400px">
          {{velcroData.rects.floating.width}}
          {{velcroData.rects.floating.height}}
        </div>
      </Velcro>
    `);

    assert
      .dom('#reference')
      .hasText('200 40', 'reference element has expected dimensions');
    assert
      .dom('#floating')
      .hasText('200 400', 'floating element has expected dimensions');
    assert.dom('#floating').hasAttribute('style');
    assert.dom('#floating').hasStyle({
      position: 'fixed',
      top: '0px',
      left: '0px',
    });
    assert.ok(
      find('#floating').style.transform.includes('translate3d'),
      'floating element is positioned with translate3d'
    );
  });

  module('@middleware', function () {
    test('it yields position and middleware data', async function (assert) {
      await render(hbs`
          <Velcro as |velcroReference velcroElement velcroData|>
            <div id="reference" {{velcroReference}}>
              {{object-keys velcroData}}
            </div>
            <div id="floating" {{velcroElement}}>VelcroElement</div>
          </Velcro>
        `);

      assert
        .dom('#reference')
        .hasText(
          'x,y,initialPlacement,placement,strategy,middlewareData,rects,platform,elements',
          'has expected metadata'
        );
    });

    test('it has expected default middleware defined', async function (assert) {
      await render(hbs`
        <Velcro as |velcroReference velcroElement velcroData|>
          <div id="reference" {{velcroReference}}>
            {{object-keys velcroData.middlewareData}}
          </div>
          <div id="floating" {{velcroElement}}>VelcroElement</div>
        </Velcro>
      `);

      assert
        .dom('#reference')
        .hasText('offset,flip,shift,hide', 'has expected middleware');
    });
  });

  module('@placement', function () {
    test('has default value', async function (assert) {
      await render(hbs`
        <Velcro as |velcroReference velcroElement velcroData|>
          <div {{velcroReference}}>velcroReference</div>
          <div id="floating" {{velcroElement}}>{{velcroData.placement}}</div>
        </Velcro>
      `);

      assert.dom('#floating').hasText('bottom');
    });

    test('has argument value', async function (assert) {
      await render(hbs`
        <Velcro @placement="bottom-start" as |velcroReference velcroElement velcroData|>
          <div {{velcroReference}}>velcroReference</div>
          <div id="floating" {{velcroElement}}>{{velcroData.placement}}</div>
        </Velcro>
      `);

      assert.dom('#floating').hasText('bottom-start');
    });
  });

  module('@strategy', function () {
    test('has default value', async function (assert) {
      await render(hbs`
        <Velcro as |velcroReference velcroElement velcroData|>
          <div {{velcroReference}}>velcroReference</div>
          <div id="floating" {{velcroElement}}>{{velcroData.strategy}}</div>
        </Velcro>
      `);

      assert.dom('#floating').hasText('fixed');
      assert.dom('#floating').hasStyle({ position: 'fixed' });
    });

    test('has argument value', async function (assert) {
      await render(hbs`
        <Velcro @strategy="absolute" as |velcroReference velcroElement velcroData|>
          <div {{velcroReference}}>velcroReference</div>
          <div id="floating" {{velcroElement}}>{{velcroData.strategy}}</div>
        </Velcro>
      `);

      assert.dom('#floating').hasText('absolute');
      assert.dom('#floating').hasStyle({ position: 'absolute' });
    });
  });

  module('@offset', function () {
    test('can pass in distance', async function (assert) {
      let offsetDistance = 10;
      this.set('offsetDistance', offsetDistance);

      resetTestingContainerDimensions();

      await render(hbs`
        {{!-- render 2 Velcro's side by side, pass one a distance offset and compare the top values --}}
        {{!-- template-lint-disable no-inline-styles --}}
        <div style="display: flex">
          <Velcro @placement="bottom-start" as |velcroReference velcro|>
            <div {{velcroReference}}>velcroReference</div>
            <div id="velcro1" {{velcro}}>Velcro</div>
          </Velcro>
          <Velcro @offset={{this.offsetDistance}} @placement="bottom-start" as |velcroReference velcro|>
            <div {{velcroReference}}>velcroReference</div>
            <div id="velcro2" {{velcro}}>Velcro</div>
          </Velcro>
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
      this.set('offsetSkidding', { crossAxis: offsetSkidding });

      resetTestingContainerDimensions();

      await render(hbs`
        {{!-- render 2 Velcro's atop the other, pass one a skidding offset and compare the left values --}}
        <Velcro as |velcroReference velcro|>
          <div {{velcroReference}}>velcroReference</div>
          <div id="velcro1" {{velcro}}>Velcro</div>
        </Velcro>
        <Velcro @offset={{this.offsetSkidding}} as |velcroReference velcro|>
          <div {{velcroReference}}>velcroReference</div>
          <div id="velcro2" {{velcro}}>Velcro</div>
        </Velcro>
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

function resetTestingContainerDimensions() {
  // reset test container scale so values returned by getBoundingClientRect are accurate
  Object.assign(document.querySelector('#ember-testing').style, {
    transform: 'scale(1)',
    width: '100%',
    height: '100%',
  });
}
