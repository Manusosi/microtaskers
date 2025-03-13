/**
 * Error Tracking Utility for Microtaskers
 * Used to track and display errors in the production environment
 */

const isProd = import.meta.env.MODE === 'production';

// Create a fixed error container on the page
const createErrorContainer = () => {
  // Check if the container already exists
  if (document.getElementById('microtaskers-error-container')) {
    return;
  }

  const container = document.createElement('div');
  container.id = 'microtaskers-error-container';
  container.style.position = 'fixed';
  container.style.bottom = '0';
  container.style.right = '0';
  container.style.maxWidth = '100%';
  container.style.width = '400px';
  container.style.maxHeight = '50vh';
  container.style.overflowY = 'auto';
  container.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
  container.style.color = '#fff';
  container.style.padding = '12px';
  container.style.zIndex = '9999';
  container.style.fontFamily = 'monospace';
  container.style.fontSize = '12px';
  container.style.borderTopLeftRadius = '8px';
  container.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.3)';

  // Add a clear button
  const clearButton = document.createElement('button');
  clearButton.textContent = 'Clear Logs';
  clearButton.style.position = 'absolute';
  clearButton.style.top = '8px';
  clearButton.style.right = '8px';
  clearButton.style.padding = '4px 8px';
  clearButton.style.backgroundColor = '#666';
  clearButton.style.border = 'none';
  clearButton.style.borderRadius = '4px';
  clearButton.style.color = 'white';
  clearButton.style.cursor = 'pointer';
  clearButton.onclick = () => {
    const logContainer = document.getElementById('microtaskers-error-logs');
    if (logContainer) {
      logContainer.innerHTML = '';
    }
  };
  container.appendChild(clearButton);

  // Create title
  const title = document.createElement('div');
  title.textContent = '🐞 Debug Console';
  title.style.fontWeight = 'bold';
  title.style.marginBottom = '8px';
  title.style.fontSize = '14px';
  title.style.paddingBottom = '4px';
  title.style.borderBottom = '1px solid #666';
  container.appendChild(title);

  // Create log container
  const logContainer = document.createElement('div');
  logContainer.id = 'microtaskers-error-logs';
  logContainer.style.paddingTop = '10px';
  container.appendChild(logContainer);

  document.body.appendChild(container);
};

// Format error messages for display
const formatErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return `${error.name}: ${error.message}\n${error.stack || ''}`;
  } else if (typeof error === 'object' && error !== null) {
    try {
      return JSON.stringify(error, null, 2);
    } catch (e) {
      return `[Object]: ${Object.prototype.toString.call(error)}`;
    }
  }
  return String(error);
};

// Log error to the container
const logError = (type: string, ...args: any[]) => {
  if (!isProd) return;

  // Make sure the container exists
  createErrorContainer();

  const logContainer = document.getElementById('microtaskers-error-logs');
  if (!logContainer) return;

  // Create error entry
  const entry = document.createElement('div');
  entry.style.marginBottom = '8px';
  entry.style.paddingBottom = '8px';
  entry.style.borderBottom = '1px dashed #444';

  // Add timestamp
  const timestamp = document.createElement('div');
  timestamp.textContent = `[${new Date().toLocaleTimeString()}]`;
  timestamp.style.color = '#aaa';
  timestamp.style.marginBottom = '4px';
  entry.appendChild(timestamp);

  // Add error type
  const typeEl = document.createElement('span');
  typeEl.textContent = type;
  typeEl.style.color = type === 'ERROR' ? '#ff6b6b' : type === 'WARN' ? '#ffd166' : '#4ecdc4';
  typeEl.style.fontWeight = 'bold';
  typeEl.style.marginRight = '6px';
  entry.appendChild(typeEl);

  // Add message
  const message = document.createElement('pre');
  message.style.margin = '4px 0';
  message.style.whiteSpace = 'pre-wrap';
  message.style.wordBreak = 'break-word';
  
  // Format all arguments
  const formattedArgs = args.map(arg => formatErrorMessage(arg)).join('\n');
  message.textContent = formattedArgs;
  
  entry.appendChild(message);
  
  // Add to container (at the top)
  logContainer.insertBefore(entry, logContainer.firstChild);
};

// Log auth state for debugging
export const logAuthState = (authState: any) => {
  if (!isProd) return;
  
  // Create special auth state entry
  logError('AUTH', {
    isAuthenticated: authState.isAuthenticated,
    isLoading: authState.isLoading,
    hasUser: !!authState.user,
    userId: authState.user?.id,
    userEmail: authState.user?.email,
    timestamp: new Date().toISOString(),
  });
};

// Log navigation events for debugging
export const logNavigation = (path: string) => {
  if (!isProd) return;
  logError('NAVIGATION', `Navigated to: ${path}`);
};

// Initialize error tracking
export const initErrorTracking = () => {
  if (!isProd) return;

  // Store original console methods
  const originalConsoleError = console.error;
  const originalConsoleWarn = console.warn;
  const originalConsoleLog = console.log;

  // Override console.error
  console.error = function(...args) {
    // Log to container
    logError('ERROR', ...args);
    
    // Call original method
    originalConsoleError.apply(console, args);
  };

  // Override console.warn
  console.warn = function(...args) {
    // Log to container
    logError('WARN', ...args);
    
    // Call original method
    originalConsoleWarn.apply(console, args);
  };

  // Override console.log (only in production)
  console.log = function(...args) {
    // Log to container
    logError('LOG', ...args);
    
    // Call original method
    originalConsoleLog.apply(console, args);
  };

  // Catch unhandled errors
  window.addEventListener('error', (event) => {
    console.error('Unhandled error:', event.error || event.message);
  });

  // Catch unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
  });

  // Create the error container right away
  createErrorContainer();
  
  console.log('Error tracking initialized');
}; 