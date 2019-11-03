pragma solidity ^0.4.24;

//已创建的合约列表
contract CampaignFactory {
  address[] public deployedCampain;
  function createCampain(string _messages, uint mininum) public {
    address newCampain = new Campaign(_messages,mininum,msg.sender);
    deployedCampain.push(newCampain);
  }
  //返回合约列表数据
  function getDeployedCampaign() public view returns(address[]) {
    return deployedCampain;

  }
}



contract Campaign {

  //请求结构体
  struct Request {
    string description;//请求描述
    uint value; //请求金额
    address recipients; //受益人地址
    bool compelte;  //项目是否完成;
    uint approvalCount; //同意投资人的数量
    mapping (address => bool) approvers; //存储所有已经同意捐钱的投资人的地址映射表
  }

  //全局变量
  Request[] public  requests; //存储项目请求的动态数组
   string public campaignMessages;
  address public manager;  //众筹管理者地址
  uint public minimunContribute;  //最小贡献量
  mapping (address => bool)public approvers; //存储所有已经捐钱的投资人的地址映射表
  uint public approvesCount;  //捐献者数量

  //权限封装
  modifier restricted{
    require(msg.sender == manager);
    _;
  }

  //合约发起构造函数：设置最小贡量与管理者
  constructor(string _messages,uint minimun,address _address) public{
    campaignMessages =  _messages;
    manager = _address; //众筹管理者地址
    minimunContribute = minimun;  //最小贡献量

  }

  //捐钱函数
  function contribute() public payable{
    require(msg.value > minimunContribute); //判断投资从账户金额大于最小项献量
    approvers[msg.sender] = true; //将投资人存诸到列表
    approvesCount++;  //投资人数量加1

  }

  //管理者创建请求函数
  function createRequest(string _description, uint _value, address _addr) public restricted{
    Request memory newquest = Request({
      description:_description,
      value:_value,
      recipients:_addr,
      compelte:false,
      approvalCount:0
      });

  requests.push(newquest);
  }

  //投资人对管理者请求进行投票
  function approvalRequest(uint index)  public{
    Request storage request = requests[index];
    require(approvers[msg.sender]);
    require(!request.approvers[msg.sender]);
    request.approvers[msg.sender] =true;
    request.approvalCount++;
  }

  //转账给受益人
  function finalizeRequest(uint index)  public restricted payable{
    Request storage request = requests[index];
    require(request.approvalCount > approvesCount / 2);

    request.recipients.transfer(request.value);
    request.compelte = true;

  }

//返回数据
function getSummary() public view returns(string,uint,uint,uint,uint,address){
  return(campaignMessages,minimunContribute, address(this).balance,requests.length,approvesCount,manager);
}


function getRequesCount() public view returns(uint){
  return requests.length;
}
}
