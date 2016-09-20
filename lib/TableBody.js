'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x5, _x6, _x7) { var _again = true; _function: while (_again) { var object = _x5, property = _x6, receiver = _x7; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x5 = parent; _x6 = property; _x7 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Const = require('./Const');

var _Const2 = _interopRequireDefault(_Const);

var _TableRow = require('./TableRow');

var _TableRow2 = _interopRequireDefault(_TableRow);

var _TableColumn = require('./TableColumn');

var _TableColumn2 = _interopRequireDefault(_TableColumn);

var _TableEditColumn = require('./TableEditColumn');

var _TableEditColumn2 = _interopRequireDefault(_TableEditColumn);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var isFun = function isFun(obj) {
  return obj && typeof obj === 'function';
};

var TableBody = (function (_Component) {
  _inherits(TableBody, _Component);

  function TableBody(props) {
    var _this = this;

    _classCallCheck(this, TableBody);

    _get(Object.getPrototypeOf(TableBody.prototype), 'constructor', this).call(this, props);

    this.handleRowMouseOut = function (rowIndex, event) {
      rowIndex = _this._fixRowIndex(rowIndex);
      var targetRow = _this.props.data[rowIndex];
      _this.props.onRowMouseOut(targetRow, event);
    };

    this.handleRowMouseOver = function (rowIndex, event) {
      rowIndex = _this._fixRowIndex(rowIndex);
      var targetRow = _this.props.data[rowIndex];
      _this.props.onRowMouseOver(targetRow, event);
    };

    this.handleRowClick = function (rowIndex) {
      rowIndex = _this._fixRowIndex(rowIndex);
      var selectedRow = undefined;
      var _props = _this.props;
      var data = _props.data;
      var onRowClick = _props.onRowClick;

      data.forEach(function (row, i) {
        if (i === rowIndex - 1) {
          selectedRow = row;
        }
      });
      onRowClick(selectedRow);
    };

    this.handleSelectRow = function (rowIndex, isSelected, e) {
      rowIndex = _this._fixRowIndex(rowIndex);
      var selectedRow = undefined;
      var _props2 = _this.props;
      var data = _props2.data;
      var onSelectRow = _props2.onSelectRow;

      data.forEach(function (row, i) {
        if (i === rowIndex - 1) {
          selectedRow = row;
          return false;
        }
      });
      onSelectRow(selectedRow, isSelected, e);
    };

    this.handleSelectRowColumChange = function (e, rowIndex) {
      rowIndex = _this._fixRowIndex(rowIndex);
      if (!_this.props.selectRow.clickToSelect || !_this.props.selectRow.clickToSelectAndEditCell) {
        _this.handleSelectRow(rowIndex + 1, e.currentTarget.checked, e);
      }
    };

    this.handleEditCell = function (sectionKey, rowIndex, columnIndex, e) {
      rowIndex = _this._fixRowIndex(rowIndex);
      _this.editing = true;
      if (_this._isSelectRowDefined()) {
        columnIndex--;
        if (_this.props.selectRow.hideSelectColumn) columnIndex++;
      }
      rowIndex--;
      var stateObj = {
        currEditCell: {
          sk: sectionKey,
          rid: rowIndex,
          cid: columnIndex
        }
      };

      if (_this.props.selectRow.clickToSelectAndEditCell && _this.props.cellEdit.mode !== _Const2['default'].CELL_EDIT_DBCLICK) {
        var selected = _this.props.selectedRowKeys.indexOf(_this.props.data[rowIndex][_this.props.keyField]) !== -1;
        _this.handleSelectRow(rowIndex + 1, !selected, e);
      }
      _this.setState(stateObj);
    };

    this.handleCompleteEditCell = function (newVal, sectionKey, rowIndex, columnIndex) {
      _this.setState({ currEditCell: null });
      if (newVal !== null) {
        _this.props.cellEdit.__onCompleteEdit__(newVal, rowIndex, columnIndex, sectionKey);
      }
    };

    this.state = {
      currEditCell: null
    };

    this.editing = false;
  }

  _createClass(TableBody, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var tableClasses = (0, _classnames2['default'])('table', {
        'table-striped': this.props.striped,
        'table-bordered': this.props.bordered,
        'table-hover': this.props.hover,
        'table-condensed': this.props.condensed
      }, this.props.tableBodyClass);

      var unselectable = this.props.selectRow.unselectable || [];
      var isSelectRowDefined = this._isSelectRowDefined();
      var tableHeader = this.renderTableHeader(isSelectRowDefined);
      var inputType = this.props.selectRow.mode === _Const2['default'].ROW_SELECT_SINGLE ? 'radio' : 'checkbox';
      var CustomComponent = this.props.selectRow.customComponent;
      var tableRows = [];

      if (this.props.sections === true) {
        var headerKey = this.props.sectionKey + '-' + 'header';
        var headerContent = undefined;

        if (this.props.sectionFormat) {
          headerContent = this.props.sectionFormat('row', 'cell', this.props.sectionKey);
        } else {
          headerContent = _react2['default'].createElement(
            'td',
            { colSpan: this.props.columns.length + (isSelectRowDefined ? 1 : 0),
              style: { textAlign: 'center' } },
            _react2['default'].createElement(
              'strong',
              null,
              this.props.sectionKey
            )
          );
        }

        tableRows.push(_react2['default'].createElement(
          _TableRow2['default'],
          { key: headerKey },
          headerContent
        ));

        this.props.data.map(function (data, r) {
          var rowKey = data[this.props.keyField];
          var baseKey = this.props.sectionKey + '-' + (rowKey || tableRows.length - 1);
          rowKey = baseKey + '-' + 'row';

          var tableColumns = this.props.columns.map(function (column, i) {
            var fieldValue = data[column.name];
            var columnKey = baseKey + '-' + column.name + '-' + 'column';
            if (this.editing && column.name !== rowKey && // Key field can't be edit
            column.editable && // column is editable? default is true, user can set it false
            this.state.currEditCell !== null && this.state.currEditCell.sk === this.props.sectionKey && this.state.currEditCell.rid === r && this.state.currEditCell.cid === i) {
              return this.renderTableEditColumn(column, data, r, fieldValue, i, columnKey);
            } else {
              return this.renderTableColumn(column, data, r, fieldValue, i, columnKey);
            }
          }, this);
          tableRows.push(this.renderTableRow(data, tableColumns, r, unselectable, isSelectRowDefined, CustomComponent, rowKey, inputType));
        }, this);
      } else {
        (function () {
          var rowKey = _this2.props.data[_this2.props.keyField];
          tableRows = _this2.props.data.map(function (data, r) {
            var tableColumns = this.props.columns.map(function (column, i) {
              var fieldValue = data[column.name];
              if (this.editing && column.name !== this.props.keyField && // Key field can't be edit
              column.editable && // column is editable? default is true, user can set it false
              this.state.currEditCell !== null && this.state.currEditCell.rid === r && this.state.currEditCell.cid === i) {
                return this.renderTableEditColumn(column, data, r, fieldValue, i);
              } else {
                return this.renderTableColumn(column, data, r, fieldValue, i);
              }
            }, this);
            return this.renderTableRow(data, tableColumns, r, unselectable, isSelectRowDefined, CustomComponent, rowKey, inputType);
          }, _this2);
        })();
      }

      if (tableRows.length === 0) {
        tableRows.push(_react2['default'].createElement(
          _TableRow2['default'],
          { key: '##table-empty##' },
          _react2['default'].createElement(
            'td',
            { colSpan: this.props.columns.length + (isSelectRowDefined ? 1 : 0),
              className: 'react-bs-table-no-data' },
            this.props.noDataText || _Const2['default'].NO_DATA_TEXT
          )
        ));
      }

      this.editing = false;

      var tbodyKey = this.props.sectionKey + '-' + 'tbody';

      return _react2['default'].createElement(
        'div',
        { ref: 'container',
          className: (0, _classnames2['default'])('react-bs-container-body', this.props.bodyContainerClass),
          style: this.props.style },
        _react2['default'].createElement(
          'table',
          { className: tableClasses },
          tableHeader,
          _react2['default'].createElement(
            'tbody',
            { key: tbodyKey, ref: 'tbody' },
            tableRows
          )
        )
      );
    }
  }, {
    key: 'renderTableEditColumn',
    value: function renderTableEditColumn(column, data, r, fieldValue, i) {
      var key = arguments.length <= 5 || arguments[5] === undefined ? null : arguments[5];

      var editable = column.editable;
      var format = column.format ? function (value) {
        return column.format(value, data, column.formatExtraData, r).replace(/<.*?>/g, '');
      } : false;
      if (isFun(column.editable)) {
        editable = column.editable(fieldValue, data, r, i);
      }

      return _react2['default'].createElement(_TableEditColumn2['default'], {
        completeEdit: this.handleCompleteEditCell,
        // add by bluespring for column editor customize
        editable: editable,
        customEditor: column.customEditor,
        format: column.format ? format : false,
        key: key || i,
        sectionKey: this.props.sectionKey,
        blurToSave: this.props.cellEdit.blurToSave,
        rowIndex: r,
        colIndex: i,
        row: data,
        fieldValue: fieldValue });
    }
  }, {
    key: 'renderTableColumn',
    value: function renderTableColumn(column, data, r, fieldValue, i) {
      var key = arguments.length <= 5 || arguments[5] === undefined ? null : arguments[5];

      var columnChild = fieldValue && fieldValue.toString();
      var columnTitle = null;
      var tdClassName = column.className;
      if (isFun(column.className)) {
        tdClassName = column.className(fieldValue, data, r, i);
      }

      if (typeof column.format !== 'undefined') {
        var formattedValue = column.format(fieldValue, data, column.formatExtraData, r);
        if (!_react2['default'].isValidElement(formattedValue)) {
          columnChild = _react2['default'].createElement('div', { dangerouslySetInnerHTML: { __html: formattedValue } });
        } else {
          columnChild = formattedValue;
          columnTitle = column.columnTitle && formattedValue ? formattedValue.toString() : null;
        }
      } else {
        columnTitle = column.columnTitle && fieldValue ? fieldValue.toString() : null;
      }
      return _react2['default'].createElement(
        _TableColumn2['default'],
        { key: key || i,
          sectionKey: this.props.sectionKey,
          dataAlign: column.align,
          className: tdClassName,
          columnTitle: columnTitle,
          cellEdit: this.props.cellEdit,
          hidden: column.hidden,
          onEdit: this.handleEditCell,
          width: column.width },
        columnChild
      );
    }
  }, {
    key: 'renderTableRow',
    value: function renderTableRow(data, tableColumns, r, unselectable, isSelectRowDefined, CustomComponent, key, inputType) {
      if (CustomComponent === undefined) CustomComponent = null;

      var disable = unselectable.indexOf(key) !== -1;
      var selected = this.props.selectedRowKeys.indexOf(key) !== -1;
      var selectRowColumn = isSelectRowDefined && !this.props.selectRow.hideSelectColumn ? this.renderSelectRowColumn(selected, inputType, disable, CustomComponent, r) : null;
      // add by bluespring for className customize
      var trClassName = this.props.trClassName;
      if (isFun(this.props.trClassName)) {
        trClassName = this.props.trClassName(data, r);
      }
      return _react2['default'].createElement(
        _TableRow2['default'],
        { key: key,
          className: trClassName,
          isSelected: selected,
          selectRow: isSelectRowDefined ? this.props.selectRow : undefined,
          enableCellEdit: this.props.cellEdit.mode !== _Const2['default'].CELL_EDIT_NONE,
          onRowClick: this.handleRowClick,
          onRowMouseOver: this.handleRowMouseOver,
          onRowMouseOut: this.handleRowMouseOut,
          onSelectRow: this.handleSelectRow,
          unselectableRow: disable },
        selectRowColumn,
        tableColumns
      );
    }
  }, {
    key: 'renderTableHeader',
    value: function renderTableHeader(isSelectRowDefined) {
      var selectRowHeader = null;

      if (isSelectRowDefined) {
        var style = {
          width: 30,
          minWidth: 30
        };
        if (!this.props.selectRow.hideSelectColumn) {
          selectRowHeader = _react2['default'].createElement('col', { style: style, key: -1 });
        }
      }
      var theader = this.props.columns.map(function (column, i) {
        var style = {
          display: column.hidden ? 'none' : null
        };
        if (column.width) {
          var width = parseInt(column.width, 10);
          style.width = width;
          /** add min-wdth to fix user assign column width
          not eq offsetWidth in large column table **/
          style.minWidth = width;
        }
        return _react2['default'].createElement('col', { style: style, key: i, className: column.className });
      });

      return _react2['default'].createElement(
        'colgroup',
        { ref: 'header' },
        selectRowHeader,
        theader
      );
    }
  }, {
    key: 'renderSelectRowColumn',
    value: function renderSelectRowColumn(selected, inputType, disabled) {
      var _this3 = this;

      var CustomComponent = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];
      var rowIndex = arguments.length <= 4 || arguments[4] === undefined ? null : arguments[4];

      return _react2['default'].createElement(
        _TableColumn2['default'],
        { dataAlign: 'center' },
        CustomComponent ? _react2['default'].createElement(CustomComponent, { type: inputType, checked: selected, disabled: disabled,
          rowIndex: rowIndex,
          onChange: function (e) {
            return _this3.handleSelectRowColumChange(e, e.currentTarget.parentElement.parentElement.parentElement.rowIndex);
          } }) : _react2['default'].createElement('input', { type: inputType, checked: selected, disabled: disabled,
          onChange: function (e) {
            return _this3.handleSelectRowColumChange(e, e.currentTarget.parentElement.parentElement.rowIndex);
          } })
      );
    }
  }, {
    key: '_isSelectRowDefined',
    value: function _isSelectRowDefined() {
      return this.props.selectRow.mode === _Const2['default'].ROW_SELECT_SINGLE || this.props.selectRow.mode === _Const2['default'].ROW_SELECT_MULTI;
    }
  }, {
    key: '_fixRowIndex',
    value: function _fixRowIndex(rowIndex) {
      if (this.props.sections === true) {
        rowIndex--;
      }
      return rowIndex;
    }
  }]);

  return TableBody;
})(_react.Component);

TableBody.propTypes = {
  sectionKey: _react.PropTypes.string,
  sections: _react.PropTypes.bool,
  sectionFormat: _react.PropTypes.func,
  data: _react.PropTypes.array,
  columns: _react.PropTypes.array,
  striped: _react.PropTypes.bool,
  bordered: _react.PropTypes.bool,
  hover: _react.PropTypes.bool,
  condensed: _react.PropTypes.bool,
  keyField: _react.PropTypes.string,
  selectedRowKeys: _react.PropTypes.array,
  onRowClick: _react.PropTypes.func,
  onSelectRow: _react.PropTypes.func,
  noDataText: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.object]),
  style: _react.PropTypes.object,
  tableBodyClass: _react.PropTypes.string,
  bodyContainerClass: _react.PropTypes.string
};

TableBody.defaultProps = {
  sectionKey: 'default'
};

exports['default'] = TableBody;
module.exports = exports['default'];