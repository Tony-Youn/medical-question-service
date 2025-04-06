# Setting Up Supabase Service Role Key

To fix the Row-Level Security (RLS) policy error when submitting questionnaire responses, follow these steps:

1. **Get Your Service Role Key**:

   - Go to the [Supabase Dashboard](https://app.supabase.com/)
   - Select your project: "medical-question-service"
   - Navigate to: Project Settings > API > Project API keys
   - Copy the `service_role` key (it's the sensitive key that should be kept secret)

2. **Update Your Environment Variables**:

   - Open the `.env.local` file in your project
   - Replace the placeholder in this line:
     ```
     SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
     ```
   - With your actual service role key

3. **Restart Your Application**:

   - Stop your development server if it's running
   - Restart it with `npm run dev`

4. **Test the Form Submission**:
   - Navigate to `/test-submit` to test if the form submission now works
   - The service role client will bypass RLS policies when needed

## Important Security Note

The service role key has admin privileges and can bypass Row-Level Security. It should:

- Never be exposed to the client
- Only be used in server-side code
- Be kept secret and not committed to version control

## Alternative Solution

For a more secure long-term solution, consider updating your Supabase RLS policies directly:

1. Go to Supabase Dashboard > Authentication > Policies
2. Find the tables (`profiles`, `questionnaire_submissions`, `questionnaire_responses`)
3. Add appropriate INSERT policies to allow anonymous submissions

Example policy for anonymous submissions:

```sql
CREATE POLICY "Allow anonymous submissions"
ON questionnaire_submissions
FOR INSERT
TO anon
WITH CHECK (true);
```

This would allow you to remove the service role client approach in favor of proper RLS policies.
