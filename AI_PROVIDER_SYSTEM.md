# AI Provider Rotation System

## Overview

The AI assistant now features an intelligent multi-provider rotation system that automatically switches between different AI providers when daily limits are reached. This ensures continuous availability and better user experience.

## Features

### 🔄 Intelligent Provider Rotation
- Automatically selects the best available provider
- Tracks usage and error rates for each provider
- Implements least-recently-used (LRU) selection algorithm
- Persistent state management across server restarts

### 🚫 Rate Limit Detection
- Detects various types of rate limiting errors (HTTP 429, 403, quota messages)
- Automatically marks providers as unavailable when limits are reached
- Distinguishes between temporary and permanent errors

### 📊 Provider Status Tracking
- Real-time monitoring of provider availability
- Error count tracking and automatic recovery
- Persistent storage of provider states
- Detailed logging and debugging information

### 🛡️ Robust Error Handling
- Graceful fallback between providers
- User-friendly error messages
- Automatic provider reset for daily quota renewals
- Comprehensive error classification

## Supported Providers

1. **Google Gemini** (Primary)
   - Model: `gemini-2.0-flash-exp`
   - API Key: `GEMINI_API_KEY`

2. **OpenRouter** (Secondary)
   - Model: `openai/gpt-3.5-turbo`
   - API Key: `OPENROUTER_API_KEY`

3. **Hugging Face** (Tertiary)
   - Model: `mistralai/Mistral-7B-Instruct-v0.2`
   - API Key: `HUGGING_FACE_API_KEY`

## API Endpoints

### Chat Endpoint
```
POST /api/ai/chat
Content-Type: application/json

{
  "message": "Your question here"
}
```

**Response:**
```json
{
  "response": "AI response text",
  "reply": "AI response text",
  "timestamp": "2025-10-03T13:29:39.574Z",
  "provider": "gemini"
}
```

### Health Check
```
GET /api/ai/health
```

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-10-03T13:29:13.010Z",
  "availableEndpoints": ["/chat", "/status", "/reset"],
  "providers": {
    "gemini": {
      "available": true,
      "lastError": null,
      "errorCount": 0,
      "lastUsed": "2025-10-03T13:29:39.574Z"
    },
    "openrouter": {
      "available": true,
      "lastError": null,
      "errorCount": 0,
      "lastUsed": null
    },
    "huggingface": {
      "available": true,
      "lastError": null,
      "errorCount": 0,
      "lastUsed": null
    }
  },
  "apiKeys": {
    "gemini": true,
    "openrouter": false,
    "huggingface": false
  },
  "nextProvider": "gemini"
}
```

### Detailed Status
```
GET /api/ai/status
```

**Response:**
```json
{
  "timestamp": "2025-10-03T13:29:41.873Z",
  "system": "AI Provider Rotation System",
  "providers": { /* provider details */ },
  "apiKeys": { /* API key availability */ },
  "nextProvider": "gemini",
  "statistics": {
    "totalProviders": 3,
    "availableProviders": 3,
    "providersWithErrors": 0
  }
}
```

### Reset Provider Status
```
POST /api/ai/reset
```

**Response:**
```json
{
  "success": true,
  "message": "All provider statuses have been reset",
  "timestamp": "2025-10-03T13:29:41.873Z"
}
```

## Configuration

### Environment Variables

Add the following to your `.env` file:

```env
# AI Provider API Keys
GEMINI_API_KEY=your_gemini_api_key_here
OPENROUTER_API_KEY=your_openrouter_api_key_here
HUGGING_FACE_API_KEY=your_huggingface_api_key_here
```

### Provider Priority

The system automatically selects providers based on:
1. **API Key Availability** - Only providers with valid API keys are considered
2. **Provider Status** - Only available (non-rate-limited) providers are used
3. **Error Count** - Providers with fewer errors are preferred
4. **Last Used Time** - Least recently used providers are preferred (load balancing)

## How It Works

### Provider Selection Algorithm

1. **Filter Available Providers**: Only consider providers with API keys and `available: true` status
2. **Sort by Priority**: 
   - Primary: Error count (ascending)
   - Secondary: Last used time (ascending, null values first)
3. **Select Best Provider**: Choose the first provider from the sorted list

### Error Handling Flow

1. **Attempt Request**: Try the selected provider
2. **Success**: Mark provider as successful, update `lastUsed` timestamp
3. **Error**: Analyze error type:
   - **Rate Limit Error**: Mark provider as unavailable immediately
   - **Temporary Error**: Increment error count, mark unavailable after 3 errors
   - **Other Errors**: Increment error count, retry with same provider
4. **Fallback**: If provider fails, select next available provider
5. **All Failed**: Return friendly fallback message

### Automatic Recovery

- **Daily Reset**: When all providers are unavailable, the system automatically resets all statuses (handles daily quota renewals)
- **Error Count Reset**: Successful requests reset the error count to 0
- **Status Persistence**: Provider statuses are saved to `server/provider-status.json`

## Monitoring and Debugging

### Console Logs

The system provides detailed console logging:

```
🤖 Attempting with provider: gemini (attempt 1/3)
✅ Success with provider: gemini
🚫 Provider openrouter marked as unavailable: { isRateLimit: true, errorCount: 1, error: 'Request failed with status code 429' }
🔄 No providers available, resetting all...
```

### Status File

Provider states are persisted in `server/provider-status.json`:

```json
{
  "gemini": {
    "available": true,
    "lastError": null,
    "errorCount": 0,
    "lastUsed": "2025-10-03T13:29:39.574Z"
  },
  "openrouter": {
    "available": false,
    "lastError": {
      "message": "Request failed with status code 429",
      "status": 429,
      "isRateLimit": true,
      "isTemporary": true,
      "timestamp": "2025-10-03T13:30:00.000Z"
    },
    "errorCount": 1,
    "lastUsed": null
  }
}
```

## Benefits

1. **High Availability**: Automatic failover ensures the AI assistant is always available
2. **Cost Optimization**: Distributes load across multiple providers
3. **Rate Limit Resilience**: Gracefully handles daily quota limits
4. **User Experience**: Seamless switching with consistent response format
5. **Monitoring**: Real-time visibility into provider health and usage
6. **Scalability**: Easy to add new providers or modify selection logic

## Adding New Providers

To add a new AI provider:

1. **Add API Key**: Update `.env` with the new provider's API key
2. **Implement Provider Function**: Create a `callNewProvider()` function in `aiProviders.cjs`
3. **Update Provider Status**: Add the provider to the `providerStatus` object
4. **Update Selection Logic**: Add the provider case to the `getAIResponse()` switch statement
5. **Update API Key Check**: Include the provider in the `checkAPIKeys()` function

## Troubleshooting

### Common Issues

1. **No Providers Available**: Check that at least one API key is configured
2. **All Providers Failing**: Use the `/api/ai/reset` endpoint to reset provider statuses
3. **Persistent Errors**: Check the `/api/ai/status` endpoint for detailed error information
4. **Rate Limits**: The system should automatically handle these, but you can monitor via status endpoints

### Manual Recovery

If needed, you can manually reset the system:

```bash
# Reset all provider statuses
curl -X POST http://localhost:3000/api/ai/reset

# Check current status
curl -X GET http://localhost:3000/api/ai/status
```

## Future Enhancements

- **Load Balancing**: Implement round-robin or weighted selection
- **Performance Metrics**: Track response times and success rates
- **Custom Models**: Allow model selection per provider
- **Quota Tracking**: Monitor usage against known limits
- **Health Checks**: Periodic provider availability testing
- **Admin Dashboard**: Web interface for monitoring and management