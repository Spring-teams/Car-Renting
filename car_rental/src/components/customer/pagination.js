import React, { Component } from 'react';
import './../../css/pagination.css';
import { element } from 'prop-types';
class pagination extends Component {
	constructor(props, context) {
		super(props, context);
		this.state={
			pageNumber: 1,
		}
	}
	onChangeNumberPage = (e,pageNumber) => {
		e.preventDefault();
		this.props.onChangeNumberPage(pageNumber);
		this.setState({
			pageNumber: pageNumber,
		})
	}
	render() {
		console.log(this.props.maxPage);
		let { maxPage } = this.props;
		let listPagination = [];
		for(let i = 1; i <= maxPage; i++){
			listPagination.push(i);
		};
		console.log(listPagination);
		var element = listPagination.map((element, index) => {
			return (<li onClick={(e) => this.onChangeNumberPage(e,element)} className={this.state.pageNumber === element ? "current": ""}>
						<a href="anchor">{element}</a>
				</li>)
		})
		return (
			<nav data-pagination>
				<ul>
					<li onClick={(e) => this.onChangeNumberPage(e,1)}>
						<a href="anchor"><i className="fas fa-arrow-left"></i></a>
					</li>
					{element}
					<li onClick={(e) => this.onChangeNumberPage(e,maxPage)}>
						<a href="anchor"><i className="fas fa-arrow-right"></i></a>
					</li>

				</ul>
				<a href="#2">
					<i className="ion-chevron-right" />
				</a>
			</nav>
		);
	}
}

export default pagination;
