// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract FocusBadges is ERC1155, Ownable {
    using Strings for uint256;

    // Badge levels
    enum BadgeLevel {
        ROOKIE,         // 0: 1 session
        STREAK_STARTER, // 1: 7 sessions
        LIGHTNING_FOCUS,// 2: 14 sessions
        DIAMOND_MIND,   // 3: 21 sessions
        FOCUS_MASTER,   // 4: 35 sessions
        ZEN_WARRIOR,    // 5: 50 sessions
        ULTIMATE_FOCUS  // 6: 100 sessions
    }

    // Badge requirements (number of completed sessions)
    uint256[] public badgeRequirements = [1, 7, 14, 21, 35, 50, 100];
    
    // User session counts
    mapping(address => uint256) public userSessionCounts;
    
    // User badge levels
    mapping(address => BadgeLevel) public userBadgeLevels;
    
    // Badge metadata URIs
    mapping(uint256 => string) private _tokenURIs;

    event BadgeUpgraded(address indexed user, BadgeLevel newLevel, uint256 tokenId);
    event SessionCompleted(address indexed user, uint256 totalSessions);

    constructor(address initialOwner) ERC1155("") Ownable(initialOwner) {
        // Set initial metadata URIs for each badge level
        _tokenURIs[0] = "https://proof-of-focus.vercel.app/metadata/rookie.json";
        _tokenURIs[1] = "https://proof-of-focus.vercel.app/metadata/streak-starter.json";
        _tokenURIs[2] = "https://proof-of-focus.vercel.app/metadata/lightning-focus.json";
        _tokenURIs[3] = "https://proof-of-focus.vercel.app/metadata/diamond-mind.json";
        _tokenURIs[4] = "https://proof-of-focus.vercel.app/metadata/focus-master.json";
        _tokenURIs[5] = "https://proof-of-focus.vercel.app/metadata/zen-warrior.json";
        _tokenURIs[6] = "https://proof-of-focus.vercel.app/metadata/ultimate-focus.json";
    }

    function completeSession(address user) external onlyOwner {
        userSessionCounts[user]++;
        emit SessionCompleted(user, userSessionCounts[user]);
        
        // Check for badge upgrade
        _checkBadgeUpgrade(user);
    }

    function _checkBadgeUpgrade(address user) internal {
        uint256 sessions = userSessionCounts[user];
        BadgeLevel currentLevel = userBadgeLevels[user];
        
        // Find the highest badge level the user qualifies for
        for (uint256 i = badgeRequirements.length; i > 0; i--) {
            if (sessions >= badgeRequirements[i - 1]) {
                BadgeLevel newLevel = BadgeLevel(i - 1);
                
                if (newLevel > currentLevel) {
                    // Burn old badge if exists
                    if (balanceOf(user, uint256(currentLevel)) > 0) {
                        _burn(user, uint256(currentLevel), 1);
                    }
                    
                    // Mint new badge
                    _mint(user, uint256(newLevel), 1, "");
                    userBadgeLevels[user] = newLevel;
                    
                    emit BadgeUpgraded(user, newLevel, uint256(newLevel));
                }
                break;
            }
        }
    }

    function getUserBadgeLevel(address user) external view returns (BadgeLevel) {
        return userBadgeLevels[user];
    }

    function getUserSessionCount(address user) external view returns (uint256) {
        return userSessionCounts[user];
    }

    function getNextBadgeRequirement(address user) external view returns (uint256) {
        BadgeLevel currentLevel = userBadgeLevels[user];
        uint256 nextLevelIndex = uint256(currentLevel) + 1;
        
        if (nextLevelIndex >= badgeRequirements.length) {
            return badgeRequirements[badgeRequirements.length - 1]; // Max level
        }
        
        return badgeRequirements[nextLevelIndex];
    }

    function uri(uint256 tokenId) public view override returns (string memory) {
        return _tokenURIs[tokenId];
    }

    function setTokenURI(uint256 tokenId, string memory newURI) external onlyOwner {
        _tokenURIs[tokenId] = newURI;
    }

    // Emergency functions
    function emergencyMint(address to, uint256 tokenId, uint256 amount) external onlyOwner {
        _mint(to, tokenId, amount, "");
    }

    function setUserSessionCount(address user, uint256 count) external onlyOwner {
        userSessionCounts[user] = count;
        _checkBadgeUpgrade(user);
    }
}
