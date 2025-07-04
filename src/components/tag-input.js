import { LitElement, html, css } from 'lit';

export default class TagInput extends LitElement {
  /* eslint-disable indent */
  render() {
    let tagItemTmpl = '';
    if (Array.isArray(this.value)) {
      tagItemTmpl = html`${this.value
        .filter((v) => typeof v === 'string' && v.trim() !== '')
        .map((v) => html`<span class='tag'>${v}</span>`)
      }`;
    }
    return html`
      <div class='tags'>
        ${tagItemTmpl}
        <input type="text" class='editor' @paste="${(e) => this.afterPaste(e)}" @keydown="${this.afterKeyDown}" @blur="${this.onBlur}" placeholder="${this.placeholder || ''}">
      </div>
    `;
  }
  /* eslint-enable indent */

  static get properties() {
    return {
      placeholder: { type: String },
      value: { type: Array, attribute: 'value' },
    };
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === 'value') {
      if (newVal && oldVal !== newVal) {
        this.value = newVal.split(',').filter((v) => v.trim() !== '');
      }
    }
    super.attributeChangedCallback(name, oldVal, newVal);
  }

  afterPaste(e) {
    const clipboardData = e.clipboardData || window.clipboardData;
    const pastedData = clipboardData.getData('Text');
    const pastedArray = pastedData ? pastedData.split(',').filter((v) => v.trim() !== '') : '';
    if (pastedArray) {
      if (Array.isArray(this.value)) {
        this.value = [...this.value, ...pastedArray];
      } else {
        this.value = pastedArray;
      }
    }
    e.preventDefault();
  }

  afterKeyDown(e) {
    if (e.keyCode === 13) {
      e.stopPropagation();
      e.preventDefault();
      if (e.target.value) {
        if (Array.isArray(this.value)) {
          this.value = [...this.value, e.target.value];
        } else {
          this.value = [e.target.value];
        }
        e.target.value = '';
      }
    } else if (e.keyCode === 8) {
      if (e.target.value.length === 0) {
        if (Array.isArray(this.value) && this.value.length > 0) {
          this.value.splice(-1);
          this.value = [...this.value];
        }
      }
    }
  }

  onBlur(e) {
    if (e.target.value) {
      if (Array.isArray(this.value)) {
        this.value = [...this.value, e.target.value];
      } else {
        this.value = [e.target.value];
      }
      e.target.value = '';
    }
  }

  static get styles() {
    return [css`
      .tags {
        display:flex;
        flex-wrap: wrap;
        outline: none;
        padding:0;
        border-radius: 8px;
        border:1px solid var(--border-color);
        cursor:text;
        overflow:hidden;
        background:var(--input-bg);
        box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05) !important;
      }
      .tag, .editor {
        padding:3px;
        margin:2px;
        border-radius: 8px;
      }
      .tag {
        border-radius: 16px;
        background-color: var(--primary-color) !important;
        padding-left: 8px;
        padding-right: 8px;
        margin-top: 4px;
        margin-bottom: 4px;
        color: var(--bg);
      }
      .tag:hover ~ #cursor {
        display: block;
      }
      .editor {
        flex:1;
        border:1px solid transparent;
        min-width:60px;
        outline: none;
        line-height: inherit;
        font-family:inherit;
        background:transparent;
        font-size: calc(var(--font-size-small) + 1px);
      }
      .editor:focus-visible {
        outline: 1px solid;
      }
      .editor::placeholder {
        color: var(--placeholder-color);
        opacity:1;
      }
    `];
  }
}
// Register the element with the browser
customElements.define('tag-input', TagInput);
