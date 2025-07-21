
# API Documentation

This document describes the API endpoints, data formats, and integration methods for the Clobol AI Chatbot.

## Table of Contents

- [Overview](#overview)
- [Authentication](#authentication)
- [Quote API](#quote-api)
- [Support API](#support-api)
- [File Upload API](#file-upload-api)
- [Analytics API](#analytics-api)
- [Webhook Integration](#webhook-integration)
- [Error Handling](#error-handling)

## Overview

The chatbot can integrate with your existing backend systems through RESTful APIs. All endpoints expect JSON payloads and return JSON responses.

### Base Configuration

```javascript
window.BoltChatConfig = {
    apiEndpoints: {
        quotes: 'https://your-api.com/api/quotes',
        support: 'https://your-api.com/api/support',
        upload: 'https://your-api.com/api/upload',
        analytics: 'https://your-api.com/api/analytics'
    },
    
    // Optional API key for authentication
    apiKey: 'your-api-key',
    
    // Request timeout (default: 30 seconds)
    timeout: 30000
};
```

## Authentication

### API Key Authentication

Include your API key in the request headers:

```http
Authorization: Bearer your-api-key
Content-Type: application/json
```

### Custom Authentication

```javascript
window.BoltChatConfig = {
    customHeaders: {
        'X-API-Key': 'your-api-key',
        'X-Client-ID': 'chatbot-widget'
    }
};
```

## Quote API

### Submit Quote Request

**Endpoint:** `POST /api/quotes`

**Headers:**
```http
Content-Type: application/json
Authorization: Bearer your-api-key
```

**Request Body:**
```json
{
    "customerData": {
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "123-456-7890",
        "postcode": "1234AB",
        "huisnummer": "123",
        "serviceType": "new-airco",
        "aircoPurpose": "❄️ Alleen koelen",
        "roomCount": "2 kamers",
        "roomSize": "Gemiddeld (20-35 m²)",
        "houseYear": "Na 2010",
        "wallMaterial": "Beton / steen",
        "outdoorUnitLocation": "Begane grond / balkon < 3 m",
        "electrical": "1 × > 20 A",
        "customerType": "🏠 Particulier",
        "brandPreference": "🔝 Daikin – topkwaliteit, stil en zuinig",
        "pipeLength": "< 3 m",
        "condensationDrain": "🔽 Loopt vanzelf weg (natuurlijk afschot)",
        "photos": "2 foto's geüpload",
        "comments": "Extra informatie van klant"
    },
    "requestType": "email",
    "galleryId": "uuid-gallery-id",
    "timestamp": "2024-01-01T12:00:00Z",
    "source": "chatbot-widget",
    "conversationHistory": [
        {
            "id": "1",
            "content": "Ik wil graag een offerte voor een nieuwe airco",
            "isBot": false,
            "timestamp": "2024-01-01T12:00:00Z"
        }
    ]
}
```

**Response:**
```json
{
    "success": true,
    "quoteId": "quote-123",
    "message": "Quote aanvraag ontvangen",
    "estimatedResponse": "1 werkdag",
    "referenceNumber": "CLB-2024-001"
}
```

### Get Quote Status

**Endpoint:** `GET /api/quotes/{quoteId}`

**Response:**
```json
{
    "quoteId": "quote-123",
    "status": "processed",
    "created": "2024-01-01T12:00:00Z",
    "updated": "2024-01-01T14:00:00Z",
    "customerData": { /* ... */ },
    "notes": "Quote sent via email"
}
```

## Support API

### Submit Support Message

**Endpoint:** `POST /api/support`

**Request Body:**
```json
{
    "message": "User's support question or issue",
    "customerInfo": {
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "123-456-7890"
    },
    "category": "faq",
    "faqId": 5,
    "timestamp": "2024-01-01T12:00:00Z",
    "source": "chatbot-widget",
    "sessionId": "session-uuid",
    "conversationHistory": [
        {
            "id": "1",
            "content": "Hoe lang duurt een installatie?",
            "isBot": false,
            "timestamp": "2024-01-01T12:00:00Z"
        }
    ]
}
```

**Response:**
```json
{
    "success": true,
    "ticketId": "support-456",
    "message": "Bericht ontvangen",
    "estimatedResponse": "2 uur",
    "autoResponse": "Bedankt voor je vraag. We nemen zo snel mogelijk contact op."
}
```

### Get FAQ Data

**Endpoint:** `GET /api/support/faq`

**Query Parameters:**
- `category` (optional): Filter by category
- `search` (optional): Search term
- `limit` (optional): Number of results (default: 20)

**Response:**
```json
{
    "success": true,
    "faqs": [
        {
            "id": 1,
            "question": "Wat kost een airco gemiddeld?",
            "answer": "Een single-split airco...",
            "category": "prijzen",
            "keywords": ["airco", "kosten", "prijs"],
            "popularity": 95
        }
    ],
    "total": 20,
    "categories": [
        {
            "id": "prijzen",
            "name": "Prijzen & Kosten",
            "count": 5
        }
    ]
}
```

## File Upload API

### Upload Files

**Endpoint:** `POST /api/upload`

**Headers:**
```http
Content-Type: multipart/form-data
Authorization: Bearer your-api-key
```

**Request Body (Form Data):**
```
files: [File objects]
galleryId: uuid-gallery-id
customerName: John Doe
serviceType: new-airco
```

**Response:**
```json
{
    "success": true,
    "galleryId": "gallery-uuid",
    "uploadedFiles": [
        {
            "id": "file-1",
            "filename": "photo1.jpg",
            "size": 1024000,
            "mimeType": "image/jpeg",
            "url": "https://your-cdn.com/files/file-1.jpg"
        }
    ],
    "galleryUrl": "https://your-app.com/gallery/gallery-uuid"
}
```

### Get Gallery

**Endpoint:** `GET /api/upload/gallery/{galleryId}`

**Response:**
```json
{
    "galleryId": "gallery-uuid",
    "customerName": "John Doe",
    "serviceType": "new-airco",
    "created": "2024-01-01T12:00:00Z",
    "files": [
        {
            "id": "file-1",
            "filename": "photo1.jpg",
            "url": "https://your-cdn.com/files/file-1.jpg",
            "thumbnail": "https://your-cdn.com/thumbs/file-1.jpg",
            "size": 1024000,
            "mimeType": "image/jpeg"
        }
    ]
}
```

## Analytics API

### Track Event

**Endpoint:** `POST /api/analytics`

**Request Body:**
```json
{
    "event": "quote_submitted",
    "properties": {
        "serviceType": "new-airco",
        "customerType": "particulier",
        "source": "chatbot-widget"
    },
    "userId": "user-uuid",
    "sessionId": "session-uuid",
    "timestamp": "2024-01-01T12:00:00Z",
    "page": {
        "url": "https://example.com/page",
        "title": "Page Title",
        "referrer": "https://google.com"
    }
}
```

**Response:**
```json
{
    "success": true,
    "eventId": "event-123"
}
```

### Get Analytics Data

**Endpoint:** `GET /api/analytics`

**Query Parameters:**
- `start`: Start date (ISO 8601)
- `end`: End date (ISO 8601)
- `event`: Event type filter
- `groupBy`: Group by dimension (day, week, month)

**Response:**
```json
{
    "success": true,
    "data": [
        {
            "date": "2024-01-01",
            "quotes": 15,
            "supportMessages": 32,
            "faqClicks": 48
        }
    ],
    "summary": {
        "totalQuotes": 150,
        "totalSupport": 320,
        "totalFAQ": 480,
        "conversionRate": 4.5
    }
}
```

## Webhook Integration

### Configure Webhooks

```javascript
window.BoltChatConfig = {
    webhooks: {
        quoteSubmitted: 'https://your-app.com/webhooks/quote',
        supportMessage: 'https://your-app.com/webhooks/support',
        fileUploaded: 'https://your-app.com/webhooks/upload'
    }
};
```

### Webhook Payload Format

**Quote Submitted:**
```json
{
    "event": "quote_submitted",
    "timestamp": "2024-01-01T12:00:00Z",
    "data": {
        "quoteId": "quote-123",
        "customerData": { /* ... */ },
        "serviceType": "new-airco",
        "source": "chatbot-widget"
    }
}
```

**Support Message:**
```json
{
    "event": "support_message",
    "timestamp": "2024-01-01T12:00:00Z",
    "data": {
        "ticketId": "support-456",
        "message": "User message",
        "category": "faq",
        "source": "chatbot-widget"
    }
}
```

### Webhook Security

Verify webhook authenticity using signatures:

```javascript
const crypto = require('crypto');

function verifyWebhook(payload, signature, secret) {
    const expectedSignature = crypto
        .createHmac('sha256', secret)
        .update(payload)
        .digest('hex');
    
    return signature === `sha256=${expectedSignature}`;
}
```

## Error Handling

### Standard Error Response

```json
{
    "success": false,
    "error": {
        "code": "VALIDATION_ERROR",
        "message": "Required field 'email' is missing",
        "field": "email",
        "details": {
            "requiredFields": ["name", "email", "phone"]
        }
    },
    "timestamp": "2024-01-01T12:00:00Z"
}
```

### Error Codes

| Code | Description | HTTP Status |
|------|-------------|-------------|
| `VALIDATION_ERROR` | Invalid request data | 400 |
| `AUTHENTICATION_ERROR` | Invalid API key | 401 |
| `RATE_LIMIT_ERROR` | Too many requests | 429 |
| `SERVER_ERROR` | Internal server error | 500 |
| `SERVICE_UNAVAILABLE` | Service temporarily unavailable | 503 |

### Client Error Handling

```javascript
// Configure error handling
window.BoltChatConfig = {
    onError: function(error) {
        console.error('Chatbot error:', error);
        
        // Show user-friendly message
        if (error.code === 'RATE_LIMIT_ERROR') {
            this.showMessage('Te veel verzoeken. Probeer het later opnieuw.');
        } else {
            this.showMessage('Er is een fout opgetreden. Probeer het opnieuw.');
        }
    },
    
    // Retry configuration
    retries: 3,
    retryDelay: 1000
};
```

## Rate Limiting

API endpoints are rate-limited to ensure service quality:

- Quote submissions: 10 per minute per IP
- Support messages: 20 per minute per IP
- File uploads: 5 per minute per IP
- Analytics: 100 per minute per IP

Rate limit headers are included in responses:

```http
X-RateLimit-Limit: 10
X-RateLimit-Remaining: 9
X-RateLimit-Reset: 1609459200
```

## Data Privacy & GDPR

### Data Collection

The chatbot collects:
- Contact information (name, email, phone)
- Service preferences and requirements
- Conversation history
- File uploads
- Usage analytics

### Data Retention

- Quote data: Retained for 2 years
- Support messages: Retained for 1 year
- Analytics data: Aggregated, retained indefinitely
- File uploads: Retained for 6 months

### GDPR Compliance

**Data Subject Rights:**

```http
# Request user data
GET /api/gdpr/data-export?email=user@example.com

# Delete user data
DELETE /api/gdpr/data-deletion?email=user@example.com

# Update consent
PUT /api/gdpr/consent
{
    "email": "user@example.com",
    "consents": {
        "marketing": false,
        "analytics": true
    }
}
```

## Integration Examples

### Express.js Integration

```javascript
const express = require('express');
const app = express();

app.post('/api/quotes', async (req, res) => {
    try {
        const { customerData, requestType, galleryId } = req.body;
        
        // Validate request
        if (!customerData.email) {
            return res.status(400).json({
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Email is required'
                }
            });
        }
        
        // Process quote
        const quote = await processQuoteRequest(customerData);
        
        // Send confirmation email
        await sendQuoteConfirmation(customerData.email, quote);
        
        res.json({
            success: true,
            quoteId: quote.id,
            message: 'Quote aanvraag ontvangen',
            referenceNumber: quote.referenceNumber
        });
        
    } catch (error) {
        console.error('Quote processing error:', error);
        res.status(500).json({
            success: false,
            error: {
                code: 'SERVER_ERROR',
                message: 'Internal server error'
            }
        });
    }
});
```

### PHP Integration

```php
<?php
// Handle quote submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    // Validate input
    $required = ['name', 'email', 'phone', 'serviceType'];
    $customerData = $input['customerData'] ?? [];
    
    foreach ($required as $field) {
        if (empty($customerData[$field])) {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'error' => [
                    'code' => 'VALIDATION_ERROR',
                    'message' => "Field '$field' is required"
                ]
            ]);
            exit;
        }
    }
    
    // Process quote
    $quoteId = processQuote($customerData);
    
    echo json_encode([
        'success' => true,
        'quoteId' => $quoteId,
        'message' => 'Quote aanvraag ontvangen'
    ]);
}
?>
```

For more API documentation and examples, contact support@clobol.nl or check the integration examples in the repository.
