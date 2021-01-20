import styled from 'styled-components'

const Styles = styled.div`
    .container {
        max-width: 60vw;
        overflow-x: scroll;
        overflow-y: scroll;
        @media screen and (max-width: 760px) {
            width: 50vw;
        }
        @media screen and (max-width: 599px) {
            width: 90vw;
            max-width: 90vw;
        }
    }
  .box {
      display: flex;
      width: fit-content;
      flex-direction: column;
      padding-bottom: 15px;
      overflow-x: scroll;
      overflow-y: scroll;
  }
  .table {
    display: inline-block;
    border-spacing: 0;
    border: 1px solid black;
    .tr {
      :last-child {
        .td {
          border-bottom: 0;
        }
      }
    }

    .th,
    .td {
       
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      ${'' /* In this example we use an absolutely position resizer,
       so this is required. */}
      position: relative;

      :last-child {
        border-right: 0;
      }

      .resizer {
        display: inline-block;
        background: black;
        width: 5px;
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
        transform: translateX(50%);
        z-index: 1;
        ${'' /* prevents from scrolling while dragging on touch devices */}
        touch-action:none;

        &.isResizing {
          background: blue;
        }
      }
    }
  }
`

export default Styles;