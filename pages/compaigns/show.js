import React from 'react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import {Card, Grid,Button} from 'semantic-ui-react';
import ContributeFrom from '../../components/contributeForm';

import web3 from '../../ethereum/web3';
import {Link} from '../../routes'



class Compaingnshow extends React.Component{

  static async getInitialProps(props){
     console.log(props.query.address);
    const campaign = Campaign(props.query.address);
    const summary = await campaign.methods.getSummary().call();
    console.log(summary);
    return {
      address:props.query.address,
      minimunContribute:summary[1],
      balance:summary[2],
      requestcount:summary[3],
      approvalCount:summary[4],
      manager:summary[5],
      msg:summary[0],
    };
  }


renderCards(){
  const {
    address,
    minimunContribute,
    balance,
    requestcount,
    approvalCount,
    manager,
    msg,
  }=this.props;

  const items = [
      {
        header:  msg,
        meta:'众筹项目标题',
        description:'当前管理者创建的众筹项目说明',
        style:{overflowWrap:'break-word'}
      },
  {
    header:  manager,
    meta:'管理者的地址',
    description:'当前管理者创建的众筹列表,并且是众筹的受益人',
    style:{overflowWrap:'break-word'}
  },
  {
    header:  minimunContribute,
    meta:'最小供献量',
    description:'如果你想对此众筹投资，你就需要至少大于当前的金额',
    style:{overflowWrap:'break-word'}
  },
  {
    header:  requestcount,
    meta:'请求数量',
    description:'当前的管理者创建请求从合约中提钱，必需要大于50%投资人同意！',
    style:{overflowWrap:'break-word'}
  },
  {
    header:  approvalCount,
    meta:'投资人数量',
    description:'已经为当前众筹投资的投资人的数量！',
    style:{overflowWrap:'break-word'}
  },
  {
    header: web3.utils.fromWei(balance,'ether') ,
    meta:'总众筹的金额(ether)',
    description:'当前众筹中，还剩下了多少的金额',
    style:{overflowWrap:'break-word'}
  },
];

  return <Card.Group items={items}/>
}

  render(){



    return(
      <Layout>
      <h1>众筹信息显示：</h1>
       <Grid>
           <Grid.Row>
              <Grid.Column width={10}>
                  {this.renderCards()}

              </Grid.Column >
              <Grid.Column width={6}>
                  <ContributeFrom address={this.props.address}/>
              </Grid.Column >
           </Grid.Row>
           <Grid.Row>
               <Grid.Column >
                   <Link route={`/compaigns/${this.props.address}/requests`}>
                       <a>
                           <Button primary>查看请求？</Button>
                      </a>
                   </Link>
               </Grid.Column >
           </Grid.Row>

       </Grid>


      </Layout>
    )
  }
}
export default Compaingnshow;
