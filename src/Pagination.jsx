import React, {Component, Fragment} from 'react';
import './App.css';
const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";

class Pagination extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            currentPage: 1
        }
    this.limits=this.limits.bind(this);
    this.getPageNumber = this.getPageNumber.bind(this);
    this.gotoPage = this.gotoPage.bind(this);
    this.handleNavigation = this.handleNavigation.bind(this);
    this.moveLeft = this.moveLeft.bind(this);
    this.moveRight = this.moveRight.bind(this);    

    }
     
  limits(lower, upper, increment = 1) {
        let i = lower;
        const limits = [];
        while (i <= upper) {
            limits.push(i);
            i += increment;
            }
        return limits;
    };

    getPageNumber(){
        const pagesInTotal = Math.ceil(this.props.data.length/this.props.dataInOnePage);
        const currPage = this.props.presentPage;
        const pageNeighbours = this.props.pageNeighbours;

        const totalNumbers = pageNeighbours * 2 + 3;
        const blocks = totalNumbers + 2;

        if (pagesInTotal > blocks) {
        let pages = [];

        const leftLimit = currPage - pageNeighbours;
        const rightLimit = currPage + pageNeighbours;
        const beforeLastPage = pagesInTotal - 1;

        const startPage = leftLimit > 2 ? leftLimit : 2;
        const endPage = rightLimit < beforeLastPage ? rightLimit : beforeLastPage;

        pages = this.limits(startPage, endPage);

        const pagesCount = pages.length;
        const singleSpillOffset = totalNumbers - pagesCount - 1;

        const leftSpill = startPage > 2;
        const rightSpill = endPage < beforeLastPage;

        const leftSpillPage = LEFT_PAGE;
        const rightSpillPage = RIGHT_PAGE;

        if (leftSpill && !rightSpill) {
            const extraPages = this.limits(startPage - singleSpillOffset, startPage - 1);
            pages = [leftSpillPage, ...extraPages, ...pages];
        } else if (!leftSpill && rightSpill) {
            const extraPages = this.limits(endPage + 1, endPage + singleSpillOffset);
            pages = [...pages, ...extraPages, rightSpillPage];
        } else if (leftSpill && rightSpill) {
            pages = [leftSpillPage, ...pages, rightSpillPage];
        }

        return [1, ...pages, pagesInTotal];
        }

        return this.limits(1, pagesInTotal);
    };

    componentDidMount() {
    this.gotoPage(1);
    }

    gotoPage (page){
        const { onPageChanged = f => f } = this.props;

        const currentPage = Math.max(0, Math.min(page, Math.ceil(this.props.data.length/this.props.dataInOnePage)));


        this.setState({ currentPage }, () => onPageChanged(currentPage));
    };

  handleNavigation(page, evt) {
    evt.preventDefault();
    this.gotoPage(page);
  };

  moveLeft(evt) {
    evt.preventDefault();
    this.gotoPage(this.state.currentPage - this.props.pageNeighbours * 2 - 1);
  };

  moveRight(evt) {
    evt.preventDefault();
    this.gotoPage(this.state.currentPage + this.props.pageNeighbours * 2 + 1);
  };


    render(){
        if (!this.props.data.length) return null;

        if (this.props.data.length === this.props.dataInOnePage) return null;

        const { currentPage } = this.state;
        const pages = this.getPageNumber();
        return(
            <Fragment>
                <nav>
                <ul>
                {pages.map((page, index) => {
                if (page === LEFT_PAGE)
                    return (
                    <li key={index} className="page-item">
                        <a
                            href="#"
                            className="page-link"
                            onClick={this.moveLeft}
                        >
                          <span aria-hidden="true">&laquo;</span>
                          <span>Previous</span>
                        </a>
                    </li>
                );

              if (page === RIGHT_PAGE)
                return (
                  <li key={index} className="page-item">
                    <a
                      href="#"
                      className="page-link"
                      onClick={this.moveRight}
                    >
                      <span aria-hidden="true">&raquo;</span>
                      <span>Next</span>
                    </a>
                  </li>
                );

              return (
                <li
                  key={index}
                  className={`page-item${
                    currentPage === page ? " active" : ""
                  }`}
                >
                  <a
                    href="#"
                    className="page-link"
                    onClick={e => this.handleNavigation(page, e)}
                  >
                    {page}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </Fragment>
    );
    }
}

export default Pagination;