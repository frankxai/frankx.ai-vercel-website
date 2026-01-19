# PDF System Deployment Checklist

## Pre-Deployment Checklist

### Environment Setup
- [ ] Add `RESEND_API_KEY` to `.env.local`
- [ ] Verify Resend domain is verified
- [ ] Test email sending in development
- [ ] Confirm "from" email is authorized in Resend

### File Preparation
- [ ] Add PDF files to `/public/guides/`
- [ ] Optimize PDF file sizes (< 5MB each)
- [ ] Create thumbnail images (if using)
- [ ] Test PDFs load correctly in browser

### Data Directory
- [ ] Create `/data` directory if doesn't exist
- [ ] Set proper permissions (755)
- [ ] Add `/data/*.json` to `.gitignore`
- [ ] Test write permissions in development

### Code Review
- [ ] Run TypeScript check: `npm run type-check`
- [ ] Run linter: `npm run lint`
- [ ] Build succeeds: `npm run build`
- [ ] No console errors in development

## Development Testing

### Component Testing
- [ ] Test `EnhancedPDFViewer` loads PDF
- [ ] Verify zoom controls work (in/out)
- [ ] Test page navigation (prev/next)
- [ ] Check download button works
- [ ] Test email modal opens/closes

### Analytics Testing
- [ ] View PDF and verify tracking
- [ ] Check `/data/pdf-views.json` created
- [ ] Download PDF and verify tracking
- [ ] Check `/data/pdf-downloads.json` created
- [ ] Verify session ID generation

### Lead Capture Testing
- [ ] Open email modal
- [ ] Fill all required fields (name, email)
- [ ] Test optional fields (company, role, etc.)
- [ ] Submit form successfully
- [ ] Verify lead in `/data/pdf-leads.json`
- [ ] Check email delivered to inbox

### Dashboard Testing
- [ ] Visit `/dashboard/pdf-analytics`
- [ ] Verify metrics display correctly
- [ ] Test time range filters (7/30/90 days)
- [ ] Check top guides ranking
- [ ] Review recent activity feed

- [ ] Visit `/dashboard/leads`
- [ ] Verify leads display in table
- [ ] Test search functionality
- [ ] Test filters (guide, interest, source)
- [ ] Export to CSV successfully

### Email Testing
- [ ] Receive immediate PDF delivery email
- [ ] Verify all links work
- [ ] Check email renders on mobile
- [ ] Test in different email clients
- [ ] Confirm unsubscribe link works

### Mobile Testing
- [ ] Test on iOS Safari
- [ ] Test on Android Chrome
- [ ] Verify touch targets (44x44px min)
- [ ] Check responsive layouts
- [ ] Test email modal on mobile

### Accessibility Testing
- [ ] Tab through all interactive elements
- [ ] Test with screen reader (VoiceOver/NVDA)
- [ ] Verify ARIA labels present
- [ ] Check color contrast (4.5:1 min)
- [ ] Test keyboard navigation

## Vercel Deployment

### Pre-Deploy
- [ ] Commit all changes to git
- [ ] Push to GitHub/GitLab
- [ ] Create feature branch for testing
- [ ] Tag release version

### Vercel Setup
- [ ] Connect repository to Vercel
- [ ] Set environment variables:
  - [ ] `RESEND_API_KEY`
- [ ] Configure build settings (if needed)
- [ ] Set Node.js version (18.x or later)

### Deploy Steps
```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Link project
vercel link

# 3. Add environment variables
vercel env add RESEND_API_KEY

# 4. Deploy to preview
vercel

# 5. Test preview URL thoroughly
# (Follow testing checklist below)

# 6. Deploy to production
vercel --prod
```

### Post-Deploy Verification
- [ ] Visit production URL
- [ ] Test PDF loading
- [ ] Submit test lead
- [ ] Verify email delivery
- [ ] Check dashboards load
- [ ] Monitor Vercel logs

## Production Testing

### Functional Testing
- [ ] Load guide page successfully
- [ ] PDF renders correctly
- [ ] Download button works
- [ ] Email modal submits
- [ ] Lead captured in system
- [ ] Email received
- [ ] Analytics tracking works
- [ ] Dashboards display data

### Performance Testing
- [ ] Run Lighthouse audit (target: 95+)
- [ ] Check Core Web Vitals:
  - [ ] LCP < 2.5s
  - [ ] FID < 100ms
  - [ ] CLS < 0.1
- [ ] Test on slow 3G network
- [ ] Verify lazy loading works

### Load Testing
- [ ] Test with 10 concurrent users
- [ ] Verify API response times < 500ms
- [ ] Check database writes succeed
- [ ] Monitor Vercel function execution
- [ ] Confirm no memory leaks

### Security Testing
- [ ] Verify dashboard is private (add auth)
- [ ] Check environment variables secure
- [ ] Test CSRF protection
- [ ] Verify email validation works
- [ ] Check for SQL injection (n/a for JSON)
- [ ] Test XSS prevention

## Monitoring Setup

### Vercel Dashboard
- [ ] Enable Analytics
- [ ] Enable Speed Insights
- [ ] Set up Error tracking
- [ ] Configure alert notifications

### Analytics Monitoring
- [ ] Set up daily dashboard checks
- [ ] Monitor conversion rates
- [ ] Track email delivery rate
- [ ] Review error logs weekly

### Data Backup
- [ ] Set up automatic backups of `/data`
- [ ] Schedule weekly exports
- [ ] Store backups in secure location
- [ ] Test backup restoration

## Post-Launch

### Week 1
- [ ] Monitor analytics daily
- [ ] Check lead quality
- [ ] Review email delivery rates
- [ ] Fix any reported bugs
- [ ] Gather user feedback

### Week 2
- [ ] Analyze conversion funnel
- [ ] Identify drop-off points
- [ ] A/B test email subject lines
- [ ] Optimize load times
- [ ] Refine lead capture fields

### Week 3-4
- [ ] Review top performing guides
- [ ] Update email templates based on data
- [ ] Optimize conversion rates
- [ ] Add new guides based on demand
- [ ] Plan follow-up sequences

## Common Issues & Solutions

### PDF Not Loading
**Issue**: PDF fails to load in viewer
**Solutions**:
1. Check file exists in `/public/guides/`
2. Verify PDF is not corrupted
3. Check file size (< 10MB)
4. Review browser console for errors

### Analytics Not Tracking
**Issue**: Views/downloads not recorded
**Solutions**:
1. Check `/data` directory exists
2. Verify write permissions
3. Review server logs
4. Check session ID generation

### Emails Not Sending
**Issue**: Users not receiving emails
**Solutions**:
1. Verify `RESEND_API_KEY` is set
2. Check Resend dashboard for errors
3. Confirm domain is verified
4. Test with different email addresses
5. Check spam folder

### Dashboard Not Loading
**Issue**: Dashboard shows errors
**Solutions**:
1. Verify data files exist
2. Check JSON is valid
3. Review API route logs
4. Clear browser cache
5. Check TypeScript compilation

### Slow Performance
**Issue**: PDF loads slowly
**Solutions**:
1. Optimize PDF file size
2. Enable CDN caching
3. Implement lazy loading
4. Compress images in PDF
5. Use Vercel Edge Network

## Rollback Plan

If critical issues arise:

```bash
# 1. Revert to previous deployment
vercel rollback

# 2. Or deploy specific commit
git checkout <previous-working-commit>
vercel --prod

# 3. Notify users if needed
# 4. Fix issue in development
# 5. Re-deploy when ready
```

## Success Metrics

Track these after launch:

### Week 1 Targets
- [ ] PDF views: 100+
- [ ] Downloads: 50+
- [ ] Leads captured: 20+
- [ ] Email delivery rate: 99%+
- [ ] Average completion rate: 40%+

### Month 1 Targets
- [ ] PDF views: 1,000+
- [ ] Downloads: 500+
- [ ] Leads captured: 200+
- [ ] Lead → Realm conversion: 5%+
- [ ] Average completion rate: 60%+

### Quality Targets (Ongoing)
- [ ] Lighthouse score: 95+
- [ ] Error rate: < 0.1%
- [ ] Email bounce rate: < 2%
- [ ] Page load time: < 2s
- [ ] Dashboard load: < 1s

## Documentation

### Maintain These
- [ ] Update README with deployment info
- [ ] Document any custom configuration
- [ ] Keep environment variables documented
- [ ] Update troubleshooting guide
- [ ] Track known issues

### Share With Team
- [ ] Dashboard access instructions
- [ ] Analytics interpretation guide
- [ ] Lead export procedures
- [ ] Email template update process
- [ ] Backup/restore procedures

## Final Checks

Before marking as complete:

- [ ] All tests passing
- [ ] Production URL working
- [ ] Analytics collecting data
- [ ] Leads being captured
- [ ] Emails delivering successfully
- [ ] Dashboards accessible
- [ ] Performance targets met
- [ ] Documentation complete
- [ ] Team trained on system
- [ ] Monitoring in place

---

## ✅ Sign-Off

**Deployed By:** _________________

**Date:** _________________

**Production URL:** _________________

**Version:** _________________

**Status:** ⬜ Development | ⬜ Staging | ⬜ Production

**Notes:**
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________

---

**Next Review Date:** _________________

**Responsible:** _________________
