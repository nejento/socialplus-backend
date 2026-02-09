# Social Media Performance Monitoring

This document outlines the comprehensive performance monitoring system implemented for the SocialPlus backend, which automatically tracks and stores engagement metrics across all supported social media platforms.

## Overview

The performance monitoring system automatically collects engagement metrics from posts across all connected social media networks. Data is stored in InfluxDB v2 for time series analysis and historical tracking.

### Key Features

- **Automated Monitoring**: Scheduled checks every 1-12 hours depending on platform API limitations
- **Manual Monitoring**: On-demand performance checks via API endpoint
- **Time Series Storage**: All data stored in InfluxDB for historical analysis
- **Network-Specific Metrics**: Each platform provides different engagement metrics
- **7-Day Tracking Window**: Monitors posts from the last 7 days

## Monitoring Configuration

### Database Configuration
- **Organization**: `socialplusorg`
- **Bucket**: `socialplus`
- **Storage**: InfluxDB v2 time series database

### Monitoring Intervals
- **Most Networks**: Every 1 hour
- **Twitter/X**: Every 12 hours (due to strict API limitations)

## Platform-Specific Metrics

### Facebook
**Monitoring Interval**: 1 hour  
**API**: Facebook Graph API Insights  
**Required Tokens**: `pageAccessToken`, `pageId`

#### Standard Metrics
- **Likes**: Total like count
- **Comments**: Total comment count  
- **Shares**: Total share count
- **Impressions**: Number of times post was displayed
- **Reach**: Number of unique users who saw the post
- **Engagement**: Total engaged users

#### Custom Metrics
- **Clicks**: Post click count
- **Video Views**: For video posts
- **Reactions**: Breakdown by reaction type (like, love, wow, etc.)

---

### Twitter/X
**Monitoring Interval**: 12 hours  
**API**: Twitter API v2  
**Required Tokens**: `api_key`, `api_secret`, `access_token`, `access_token_secret`, `bearer_token`

#### Standard Metrics
- **Likes**: Tweet like count
- **Comments**: Reply count
- **Reposts**: Retweets + quote tweets combined
- **Impressions**: Number of times tweet was displayed (if available)

#### Custom Metrics
- **Retweets**: Standard retweets
- **Quotes**: Quote tweets
- **Replies**: Reply count
- **Bookmarks**: Bookmark count (if available)
- **URL Link Clicks**: Profile and link clicks (elevated access required)
- **Organic vs Promoted**: Separate metrics for organic and promoted content

#### Special Features
- **Elevated Access Support**: Additional metrics available with Twitter API elevated access
- **Rate Limiting**: Respects Twitter's strict API limitations

---

### Instagram
**Monitoring Interval**: 1 hour  
**API**: Instagram Graph API  
**Required Tokens**: `access_token`, `business_account_id`

#### Standard Metrics
- **Likes**: Post like count
- **Comments**: Comment count
- **Impressions**: Number of times post was displayed
- **Reach**: Number of unique accounts reached
- **Engagement**: Total engagement actions

#### Custom Metrics
- **Saves**: Post save count
- **Profile Visits**: Profile visits from post
- **Website Clicks**: Website link clicks
- **Follows**: New follows from post
- **Video Views**: For video content
- **Media Type**: Image, video, carousel detection

---

### Threads
**Monitoring Interval**: 1 hour  
**API**: Threads Graph API  
**Required Tokens**: `longLivedAccessToken`, `threadsUserId`

#### Standard Metrics
- **Likes**: Thread like count
- **Comments**: Reply count (called "replies" in Threads)
- **Reposts**: Standard reposts
- **Views**: Thread view count
- **Reach**: Unique accounts reached
- **Impressions**: Total impressions

#### Custom Metrics
- **Quotes**: Quote posts
- **Media Type**: Text, image, video detection
- **Permalink**: Direct link to thread

---

### Bluesky
**Monitoring Interval**: 1 hour  
**API**: AT Protocol  
**Required Tokens**: `handle`, `password`

#### Standard Metrics
- **Likes**: Post like count
- **Comments**: Reply count
- **Reposts**: Repost count

#### Custom Metrics
- **URI**: AT Protocol URI
- **Author Handle**: Post author
- **Languages**: Post language detection
- **Embed Detection**: Media/link embed information
- **Created Date**: Original post timestamp

#### Limitations
- Limited analytics compared to other platforms
- No impression/reach data available
- Basic engagement metrics only

---

### Mastodon
**Monitoring Interval**: 1 hour  
**API**: Mastodon API  
**Required Tokens**: `instanceUrl`, `accessToken`

#### Standard Metrics
- **Likes**: Favourite count (Mastodon's equivalent of likes)
- **Comments**: Reply count
- **Reposts**: Reblog count (Mastodon's equivalent of retweets)

#### Custom Metrics
- **URI**: Mastodon status URI
- **URL**: Public URL to status
- **Language**: Status language
- **Visibility**: Public, unlisted, private, direct
- **Sensitive Content**: Content warning flag
- **Media Attachments**: Count and types of media
- **Poll Data**: Poll votes if status contains a poll

#### Features
- **Instance Flexibility**: Works with any Mastodon instance
- **Open API**: No strict rate limiting
- **Privacy Aware**: Respects visibility settings

---

## Data Storage Structure

### InfluxDB Schema

**Measurement**: `post_performance`

#### Tags
- `network_type`: Social network identifier
- `post_id`: Platform-specific post ID

#### Fields
- `views` (integer): View count
- `likes` (integer): Like count
- `shares` (integer): Share count
- `comments` (integer): Comment count
- `reposts` (integer): Repost count
- `reach` (integer): Unique reach
- `impressions` (integer): Total impressions
- `engagement` (float): Engagement rate
- `click_through_rate` (float): CTR percentage
- `reaction_[type]` (integer): Specific reaction counts
- `custom_metrics` (string): JSON string of platform-specific metrics

#### Timestamp
- Automatic timestamp for each data point
- Enables time series analysis and historical tracking

## API Integration

### Automatic Monitoring
- Runs via cron scheduler
- Processes posts in batches to respect rate limits
- Handles API errors gracefully
- Supports token refresh for platforms that require it

### Manual Monitoring
- On-demand monitoring via API endpoint
- Individual post performance checks
- Real-time metric retrieval

### Error Handling
- Comprehensive logging for debugging
- Graceful degradation when APIs are unavailable
- Token validation and refresh mechanisms
- Rate limit respect and backoff strategies

## Environment Configuration

Required environment variables:

```env
# InfluxDB Configuration
INFLUXDB_URL=http://your-influxdb-server:8086
INFLUXDB_TOKEN=your-influxdb-token
INFLUXDB_ORG=socialplusorg
INFLUXDB_BUCKET=socialplus

# Optional: Base URL for file serving
BASE_URL=http://localhost:3000
```

## Implementation Status

✅ **Completed**
- All social network providers updated with monitoring capabilities
- InfluxDB service implementation
- Performance monitor service with scheduling
- Configuration management
- Error handling and logging

🔄 **Pending Integration**
- Database integration for post tracking (`getTrackedPosts()`)
- User token management (`getUserTokens()`)
- API endpoint creation for manual monitoring
- Service initialization in main application

## Usage Examples

### Retrieving Metrics History
```typescript
const metrics = await performanceMonitor.getPostMetricsHistory(
  'post_id_123',
  'facebook',
  new Date('2024-01-01'),
  new Date('2024-01-31')
);
```

### Manual Post Monitoring
```typescript
const metrics = await performanceMonitor.monitorPostManually(
  'post_id_123',
  'twitter',
  userId
);
```

### Getting Latest Metrics
```typescript
const latestMetrics = await performanceMonitor.getPostMetrics(
  'post_id_123',
  'instagram'
);
```

## Benefits

1. **Comprehensive Analytics**: Track performance across all platforms from one system
2. **Historical Data**: Time series storage enables trend analysis
3. **Automated Collection**: No manual intervention required
4. **Platform Optimization**: Compare performance across different networks
5. **Real-time Insights**: On-demand monitoring for immediate feedback
6. **Scalable Architecture**: Easily extensible for new platforms or metrics

## Future Enhancements

- **Dashboard Integration**: Visual analytics dashboard
- **Alert System**: Notifications for performance thresholds
- **Comparative Analysis**: Cross-platform performance comparison
- **Predictive Analytics**: ML-based performance prediction
- **Custom Metrics**: User-defined tracking parameters
