odoo.define('custom_toc.s_table_of_content_options', function (require) {
  'use strict';

  console.log('Custom TOC script loaded');

  const options = require('web_editor.snippets.options');

  options.registry.TableOfContent = options.registry.TableOfContent.extend({
    /**
     * @override
     */
    start: function () {
      console.log('Overridden start function called');
      this.targetedElements = 'h1, h2, h3';
      this.oldHeadingsEls = [];
      const $headings = this.$target.find(this.targetedElements);
      if ($headings.length > 0) {
        this._generateNav();
      }
      // Generate the navbar if the content changes
      const targetNode = this.$target.find('.s_table_of_content_main')[0];
      const config = {attributes: false, childList: true, subtree: true, characterData: true};
      this.observer = new MutationObserver(() => this._generateNav());
      this.observer.observe(targetNode, config);
      // The mutation observer doesn't observe the attributes change, it would
      // be too much. Adding content_changed "listener" instead.
      this.$target.on('content_changed', () => this._generateNav());
      return this._super(...arguments);
    },
    /**
     * @private
     */
    _generateNav: function (ev) {
      const blockTextContent = this.$target[0].textContent.replaceAll('\n', '').trim();
      if (blockTextContent === '') {
        // destroy public widget and remove the ToC since there are no more
        // child elements, before doing so the observer needs to be
        // disconnected else observer observe mutation and _generateNav
        // gets called even after there's no more ToC.
        this.observer.disconnect();
        this.trigger_up('remove_snippet', {$snippet: this.$target});
        return;
      }
      this.options.wysiwyg && this.options.wysiwyg.odooEditor.unbreakableStepUnactive();
      const navEl = this.$target[0].querySelector('.s_table_of_content_navbar');
      const headingsEls = this.$target.find(this.targetedElements).toArray()
        .filter(el => !el.closest('.o_snippet_desktop_invisible'));
      const areHeadingsEqual = this.oldHeadingsEls.length === headingsEls.length
        && this.oldHeadingsEls.every((el, i) => el.isEqualNode(headingsEls[i]));
      const areVisibilityIdsEqual = headingsEls.every((headingEl) => {
        const visibilityId = headingEl.closest('section').getAttribute('data-visibility-id');
        const matchingLinkEl = navEl.querySelector(`a[href="#${headingEl.getAttribute('id')}"]`);
        const matchingLinkVisibilityId = matchingLinkEl ? matchingLinkEl.getAttribute('data-visibility-id') : null;
        // Check if visibilityId matches matchingLinkVisibilityId or both
        // are null/undefined
        return visibilityId === matchingLinkVisibilityId;
      });
      if (areHeadingsEqual && areVisibilityIdsEqual) {
        // If the content of the navbar before the change of the DOM is
        // equal to the content of the navbar after the change of the DOM,
        // then there is no need to regenerate the navbar.
        // This is especially important as to regenerate it, we also have
        // to restart scrollSpy, which is done by restarting widgets. But
        // restarting all widgets inside the ToC would certainly lead to
        // DOM changes... which would then regenerate the navbar and lead to
        // an infinite loop.
        return;
      }
      // We dispose the scrollSpy because the navbar will be updated.
      this._disposeScrollSpy();
      navEl.innerHTML = '';
      _.each(headingsEls, el => {
        const $el = $(el);
        const id = 'table_of_content_heading_' + _.now() + '_' + _.uniqueId();
        const visibilityId = $el.closest('section').attr('data-visibility-id');
        $('<a>').attr({'href': "#" + id, 'data-visibility-id': visibilityId})
          .addClass('table_of_content_link list-group-item list-group-item-action py-2 border-0 rounded-0')
          .text($el.text())
          .appendTo(navEl);
        $el.attr('id', id);
        $el[0].dataset.anchor = 'true';
      });
      const exception = (tocEl) => !tocEl.querySelector('.s_table_of_content_navbar a');
      this._activateScrollSpy(exception);
      this.oldHeadingsEls = [...headingsEls.map(el => el.cloneNode(true))];
    },
  });
});
