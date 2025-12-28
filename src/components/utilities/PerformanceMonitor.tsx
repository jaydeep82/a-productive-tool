'use client';

import { useEffect } from 'react';

/**
 * Lightweight utility component to monitor and log key performance metrics (FCP, LCP).
 * It uses the Performance Observer API to track user-centric loading times.
 * This component runs entirely client-side and renders nothing.
 */
export function PerformanceMonitor() {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof PerformanceObserver === 'undefined') {
      return;
    }

    const metrics: Record<string, number> = {};

    // Helper function to calculate and log the metrics
    const reportMetrics = () => {
      // Calculate total page load time based on navigation timing API
      const navigationStart = performance.timing.navigationStart;
      const loadEventEnd = performance.timing.loadEventEnd;
      
      const totalLoadTime = loadEventEnd > navigationStart 
        ? loadEventEnd - navigationStart 
        : null;

      console.groupCollapsed('📊 Performance Monitoring (Next.js Page Load)');
      
      if (totalLoadTime !== null) {
        console.log(`⏱️ Total Load Time (DOM Ready): ${totalLoadTime.toFixed(2)}ms`);
      }

      if (metrics.FCP) {
        // FCP (First Contentful Paint): How long it takes for the browser to render the first piece of DOM content.
        console.log(`🎨 First Contentful Paint (FCP): ${metrics.FCP.toFixed(2)}ms`);
      }
      if (metrics.LCP) {
        // LCP (Largest Contentful Paint): How long it takes for the largest content element to become visible.
        console.log(`🖼️ Largest Contentful Paint (LCP): ${metrics.LCP.toFixed(2)}ms`);
      }
      
      console.log(`🔗 Current URL: ${window.location.href}`);
      console.groupEnd();
    };

    // 1. Observe FCP and LCP using PerformanceObserver
    const observer = new PerformanceObserver((list) => {
      let shouldReport = false;
      
      list.getEntries().forEach((entry) => {
        if (entry.name === 'first-contentful-paint' && entry.startTime > 0) {
          metrics.FCP = entry.startTime;
        } else if (entry.entryType === 'largest-contentful-paint') {
          // LCP reports updates, so we always take the latest score
          metrics.LCP = entry.startTime;
          shouldReport = true; 
        }
      });
      
      // We wait until LCP is reported before reporting the final results
      if (shouldReport) {
        observer.disconnect();
        // Use a short timeout to ensure the browser has settled, mimicking standard web-vitals reporting structure
        setTimeout(reportMetrics, 50); 
      }
    });

    try {
      // Observe paint events (for FCP) and LCP
      observer.observe({ type: 'paint', buffered: true });
      observer.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch (e) {
      console.warn("PerformanceObserver API support error.", e);
    }

    // Cleanup function to disconnect the observer on component unmount (e.g., during navigation)
    return () => {
      try {
        observer.disconnect();
      } catch (e) {
        // Ignore if already disconnected
      }
    };
  }, []); // Run only once on mount per route change

  return null;
}
