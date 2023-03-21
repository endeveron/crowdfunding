// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CrowdFunding {
  struct Campaign {
    address owner;
    string title;
    string category;
    string ownerName;
    string description;
    uint256 target;
    uint256 deadline;
    uint256 amountCollected;
    string image;
    address[] donators;
    uint256[] donations;
  }

  mapping(uint256 => Campaign) public campaigns;

  uint256 public numberOfCampaigns = 0;

  function createCampaign(
    address _owner, 
    string memory _ownerName, 
    string memory _title, 
    string memory _category,
    string memory _description,
    uint256 _target,
    uint256 _deadline,
    string memory _image

    ) public returns (uint256) {
      Campaign storage campaign = campaigns[numberOfCampaigns];

      // Check is everything ok?
      require(campaign.deadline < block.timestamp, 'The deadline should be a date in the future.');

      campaign.owner = _owner;
      campaign.ownerName = _ownerName;
      campaign.title = _title;
      campaign.category = _category;
      campaign.description = _description;
      campaign.target = _target;
      campaign.deadline = _deadline;
      campaign.amountCollected = 0;
      campaign.image = _image;

      numberOfCampaigns++;

      return numberOfCampaigns - 1;
    }

  function donateCampaign(uint256 _id) public payable {
    uint256 amount = msg.value;

    Campaign storage campaign = campaigns[_id];

    campaign.donators.push(msg.sender);
    campaign.donations.push(amount);

    (bool sent,) = payable(campaign.owner).call{value: amount}('');

    if (sent) {
      campaign.amountCollected = campaign.amountCollected + amount;
    }
  }

  function getDonators(uint256 _id) public view returns(address[] memory, uint256[] memory) {
    return (campaigns[_id].donators, campaigns[_id].donations);
  }

  function getCampaigns() public view returns(Campaign[] memory) {
    // Create an empty list with length of numberOfCampaigns
    Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

    for (uint i = 0; i < numberOfCampaigns; i++) {
      Campaign storage item = campaigns[i];

      allCampaigns[i] = item;
    }

    return allCampaigns;
  }
}