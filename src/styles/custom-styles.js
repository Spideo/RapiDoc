import { css } from 'lit';

/*
This file is reserved for any custom css that developers want to add to
customize their theme. Simply add your css to this file and yarn build.
*/

export default css`
    * :not(.fa):not(.fas):not(i):not(mat-icon):not(nb-icon):not(.m-btn):not(.tab-btn) {
        font-family: Inter !important;
        letter-spacing: -.02em;
    }

    .nav-bar-components, .nav-bar-h1, .nav-bar-h2, .nav-bar-info, .nav-bar-tag, .nav-bar-path {
        border-radius: none;
    }

    .nav-bar-components:hover, .nav-bar-h1:hover, .nav-bar-h2:hover, .nav-bar-info:hover, .nav-bar-tag:hover, .nav-bar-path:hover {
        background-color: transparent;
        color: #5e54ed !important; // spideo blue
    }

    .m-table {
        border-radius: 8px;
        border-width: 2px;
        border-color: var(--border-color); // gray 50
    }
    
    .m-table td {
        padding: 12px 8px 4px;
    }
    
    .tags {
        border-radius: 8px;
    }

    .request-panel {
        padding-top: 24px;
        margin-top: 12px;
        border-top: 1px dashed var(--border-color);
    }

    .bold-text {
        font-weight: 700;
    }

    .title {
        font-weight: 400;
    }

    .json-tree {
        max-height: 50vh;
        overflow: scroll;
    }
    
    .example-panel, .tree {
        background: #f2f8ff; // sky blue 50
        padding-left: 8px
    }
    
    .divider {
        height: 2px;
        background-color: var(--primary-color)
        border: 0px;
    }
`;
