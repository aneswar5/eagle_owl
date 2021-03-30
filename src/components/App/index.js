import React, { useEffect, useState } from 'react';
import {
    Row, Col, Card, CardBody,
    TabContent, TabPane, Nav, NavItem, NavLink, Badge
} from 'reactstrap';
import './style.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import classnames from 'classnames';



export default function Index() {

    const [activeTab, setActiveTab] = useState('1');
    const [recipeData,setRecipeData] =useState([])
    const [highMargin, setHighMargin]=useState([])
    const [lowMargin,setLowMargin]=useState([])
    const [fluctuating,setFluctuating]=useState([])

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
        
    }

    useEffect(()=>{
        RecipeData()
        HighMarginData()
        LowMarginData()
        FluctuatingData()
    },[])
    const RecipeData = async () =>
    {
        const url = 'https://beta.eagleowl.in/api/v1/mock/organization/18/outlet/18/recipe/recipes/?format=json&page=1'
        const response = await fetch(url);
        if( response.status === 200)
        {
           response.json().then(data=>{
               //setRecipeData(data)
               console.log(data.results);
               setRecipeData(data.results)
           })
           .catch((err)=>{
               console.log(err);
           })
        }
    }

    const HighMarginData = async () =>{
        const url = 'https://beta.eagleowl.in/api/v1/mock/organization/18/outlet/18/recipe/margin-group/?order=top'
        const response = await fetch(url)
        if ( response.status === 200)
        {
            response.json().then(data=>{
                console.log(data);
                setHighMargin(data.results)

            })
        }
    }

    const LowMarginData = async () =>
    {
        const url = 'https://beta.eagleowl.in/api/v1/mock/organization/18/outlet/18/recipe/margin-group/?order=bottom'
        const response = await fetch(url)
        if ( response.status === 200 )
        {
            response.json().then(data => {
                setLowMargin(data.results)
            })
        }
    }

    const FluctuatingData = async () => {

        const url='https://beta.eagleowl.in/api/v1/mock/organization/18/outlet/18/recipe/fluctuation-group/?order=top'
        const response = await fetch(url)
        if ( response.status === 200)
        {
            response.json().then(data =>
                {
                    setFluctuating(data.results)
                })
        }

    }

    return (
        <>
            <div className="m-5">
                <Row>
                    <Col md={4}>
                        <div className="card_title">High Margin Recipes</div>
                        <Card>
                            <CardBody>
                                <Row className="small_tag">
                                {highMargin.map((item)=>{
                                    return (
                                        <Col md={4}>
                                        <small>{item.name}</small>
                                        <div className="mt-3 circle_progress_high"><CircularProgressbar value={item.margin} text={`${item.margin}%`} /></div>
                                    </Col>
                                    )
                                })}
                                </Row>
                                
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <div className="card_title">Low Margin Recipes</div>
                        <Card >
                            <CardBody>
                                 <Row className="small_tag"> 
                               {lowMargin.map((item)=>{
                                   return(
                                    <Col md={4}>
                                        <small>{item.name}</small>
                                        <div className="mt-3 circle_progress_high"><CircularProgressbar value={item.margin} text={`${item.margin}%`} /></div>
                                    </Col>   
                                   )
                               })}
                               </Row>
                               
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <div className="card_title">Top Fluctuating Recipes</div>
                        <Card>
                            <CardBody>
                                <Row className="small_tag">
                                    {fluctuating.map((item) => {
                                        return (
                                            <Col md={4}>
                                                <small className="mb-2">{item.name}</small>
                                                <div className="fluctuating mt-2"><div className="mt-2 arrow_down">{item.fluctuation}% <FontAwesomeIcon icon={faArrowDown} /></div></div>
                                            </Col>
                                        )
                                    })}
                                   
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <div className="mt-4">
                    <Card>
                        <CardBody>
                            <Nav tabs>
                                <NavItem className="tab_style">
                                    <NavLink
                                        className={activeTab === '1' ? classnames({ active: activeTab === '1' }, "tabs_active") : "tabs_inactive"}
                                        onClick={() => { toggle('1'); }} >
                                        ALL RECIPES(S)
                                </NavLink>
                                </NavItem>
                                <NavItem className="tab_style">
                                    <NavLink
                                        className={activeTab === '2' ? classnames({ active: activeTab === '2' }, "tabs_active") : "tabs_inactive"}
                                        onClick={() => { toggle('2'); }} >
                                        INCORRECT
                                </NavLink>
                                </NavItem>
                                <NavItem className="tab_style">
                                    <NavLink
                                        className={activeTab === '3' ? classnames({ active: activeTab === '3' }, "tabs_active") : "tabs_inactive"}
                                        onClick={() => { toggle('3'); }} >
                                        UNTAGGED
                                </NavLink>
                                </NavItem>
                                <NavItem className="tab_style">
                                    <NavLink
                                        className={activeTab === '4' ? classnames({ active: activeTab === '4' }, "tabs_active") : "tabs_inactive"}
                                        onClick={() => { toggle('4'); }} >
                                        DISABLED
                                </NavLink>
                                </NavItem>
                            </Nav>
                            <TabContent activeTab={activeTab}>
                                <TabPane tabId="1" className="mt-3">
                                    <div className="tbl_res">
                                        <Row>
                                            <table className="table table-striped"
                                                data-toggle="table"
                                                data-classes="table table-hover table-condensed"
                                                data-row-style="rowColors"
                                                data-striped="true"
                                                data-sort-name="Quality"
                                                data-sort-order="desc"
                                                data-pagination="true"
                                                data-click-to-select="true"
                                            >
                                                <thead>
                                                    <tr>
                                                        <th data-field="state" data-checkbox="true"></th>
                                                        <th data-field="NAME" data-sortable="true">NAME</th>
                                                        <th data-field="LAST_UPDATED" data-sortable="true">LAST UPDATED</th>
                                                        <th data-field="COGS%" data-sortable="true">COGS%</th>
                                                        <th data-field="COST_PRICE" data-sortable="true">COST PRICE</th>
                                                        <th data-field="SALE_PRICE" data-sortable="true">SALE PRICE</th>
                                                        <th data-field="GROSS_MARGIN" data-sortable="true">GROSS MARGIN</th>
                                                        <th >TAGS/ACTIONS</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {recipeData.map((recipe)=>{
                                                 return(
                                                <tr id="tr-id-2" class="tr-class-2">
                                                        <td></td>
                                                        <td class="success">{recipe.name}</td>
                                                        <td>{new Date(recipe.last_updated.date).toLocaleString('en-us', { month: 'long', year: 'numeric', day: 'numeric' })}</td>
                                                        <td>{recipe.cogs}</td>
                                                        <td class="success">{Math.round((recipe.cost_price)*100/100).toFixed(2)}</td>
                                                        <td>{recipe.sale_price}</td>
                                                        <td>{Math.round((recipe.gross_margin)*100/100).toFixed(2)}</td>
                                                        <td><Badge color="primary" className="barge_1">Indian Ma..</Badge>{" "}
                                                            <Badge color="primary" className="barge_2">Indian Ma..</Badge></td>
                                                    </tr>)
                                             })} 
                                                
                                                </tbody>
                                            </table>
                                        </Row>
                                    </div>
                                </TabPane>
                                <TabPane tabId="2" className="mt-2">
                                    <div className="text-center">INCORRECT</div>
                                </TabPane>
                                <TabPane tabId="3" className="mt-2">
                                    <div className="text-center">UNTAGGED</div>
                                </TabPane>
                                <TabPane tabId="4" className="mt-2">
                                    <div className="text-center">DISABLED</div>
                                </TabPane>
                            </TabContent>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </>
    )
}
