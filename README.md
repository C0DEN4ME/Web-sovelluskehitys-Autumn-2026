# Web-sovelluskehitys Autumn 2026 – Back-end

Express REST API (cats & users) with Multer file uploads.

```bash
npm install
npm run dev
```

Server runs at http://127.0.0.1:3000/public/index.html, API at `/api/v1`.
Test requests: `test/test-requests.http` (VS Code REST Client).

## Authorization rules

- Anyone can view cats and users and register a new user.
- Logged-in users can add cats; the owner is always the logged-in user.
- Users can edit and delete only their own cats and their own user account.
- Regular users cannot change their own role or user id.
- Admins can edit and delete any cat or user.
- Deleting a user also deletes their cats.
