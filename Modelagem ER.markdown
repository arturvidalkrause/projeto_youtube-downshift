caption:
  : att
__ : unique
& : ref (has)
@ : ref (isfrom)
! : implicitly
? : optional

user{
#  userEmail
#  userPassword
#  userID
#  userName
#  userPhoto
#  &userChannel
#  userMemberships
#  userSubscriptions
#  userBells
#  &userNotifications
#  !userNotificationCount
  &userHistory
}

@userNotifications{
#  notificationStatus
#  notificationDate
#  notificationContent
  @video/short/live
#  @user
}

@userHistory{
  &watchedVideo -> videoWatchDate
  &watchedLive -> liveWatchDate
  &watchedShort -> shortWatchDate
  &watchedPlaylist -> playlistWatchDate
  &
}

userChannel{
  channelAbout
  channelLinks
  channelJoinDate
  channelSubscriberCount
  !channelViewCount
  channelBanner
  __channelHandle
  channelWatermark
  channelWelcomeVideo
  channelMembers
  &channelVideos
  &channelPlaylists
  &channelLives
  &channelShorts
  @user
}

playlist{
  __playlistID
  __playlistURL
  playlistTitle
  playlistCaption
  playlistVideos
  !playlistVideoCount
  playlistStatus (private/public/nonlisted)
  playlistViewCount
  playlistTags
  @userChannel
  playlistThumbnail
}

@engagement{
  engagementLikeCount
  engagementDislikeCount
  engagementShareCount
  engagementCommentCount
  engagementViewCount
}

shorts{
  __shortID
  __shortURL
  shortTitle
  shortCaption
  &shortEngagement
  shortTags
  &shortComments
  linkedVideo (short or video)
  @userChannel
  ?shortMusic (video)
  shortDate
  shortLength
  shortThumbnail
  shortCategory
  shortLanguage
  &shortCaption
}

video{
  __videoID
  __videoURL
  videoTitle
  videoCaption
  &videoEngagement
  videoTags
  &videoComments
  @userChannel
  videoDate
  videoLength
  videoThumbnail
  videoCategory
  videoLanguage
  watchDuration
  &videoCaption
}

live{
#  __liveID
#  __liveURL
#  liveTitle
#  liveCaption
#  liveTags
#  liveComments
#  liveLikeCount
#  liveDislikeCount
#  liveCurrentlyWatching
#  liveViewCount
#  liveDate
#  liveCurrentLength
#  liveStatus (planned/in_live/finished)
#  liveThumbnail
#  liveCategory
  @userChannel
  liveLanguage
}

comment{
  @video
  @user
  commentLikeCount
  commentDislikeCount
  commentReplies (&comment)
  commentDate
  commentEdited (boolean)
}

@caption{
  captionLanguage
  captionText
}




Key Entities and Attributes:
User:
UserID (primary key)
Username
Email
Password
Profile Picture
Location
Video:
VideoID (primary key)
Title
Description
Upload Date
Video URL
Thumbnail URL
Duration
Category (e.g., Music, Gaming, Education)
Views
Channel:
ChannelID (primary key)
ChannelName
ChannelDescription
ChannelOwner (foreign key referencing UserID)
SubscriberCount
Playlist:
PlaylistID (primary key)
PlaylistName
Owner (foreign key referencing UserID)
Comment:
CommentID (primary key)
CommentText
PostDate
User (foreign key referencing UserID)
Video (foreign key referencing VideoID)
Like/Dislike:
LikeID (primary key)
User (foreign key referencing UserID)
Video (foreign key referencing VideoID)
LikeStatus (boolean - "like" or "dislike")