#import <Foundation/Foundation.h>
#import "RNReactNativeSharedGroupPreferences.h"

@implementation RNReactNativeSharedGroupPreferences

  NSUserDefaults *mySharedDefaults;
  NSString *appGroupName = @"";

- (dispatch_queue_t)methodQueue {
  return dispatch_get_main_queue();
}
RCT_EXPORT_MODULE()

  RCT_EXPORT_METHOD(getItem: (NSString *)key :(NSString *)appGroup :(NSDictionary *)options :(RCTResponseSenderBlock)callback) {
    if (![appGroup isEqualToString:appGroupName]) {
      mySharedDefaults = [[NSUserDefaults alloc] initWithSuiteName:appGroup];
    }
    if (mySharedDefaults == nil) {
      // error code 0 == no user defaults with that suite name available
      callback(@[@0]);
      return;
    }

    if ([mySharedDefaults valueForKey:key] == nil) {
      // error code 1 == suite has no value for that key
      callback(@[@1]);
      return;
    }
    callback(@[[NSNull null], [mySharedDefaults valueForKey:key]]);
  }

  RCT_EXPORT_METHOD(setItem: (NSString *)key :(NSString *)value :(NSString *)appGroup :(NSDictionary *)options :(RCTResponseSenderBlock)callback) {
    if (![appGroup isEqualToString:appGroupName]) {
      appGroupName = appGroup;
      mySharedDefaults = [[NSUserDefaults alloc] initWithSuiteName:appGroup];
    }
    if (mySharedDefaults == nil) {
      // error code 0 == no user defaults with that suite name available
      callback(@[@0]);
      return;
    }

    [mySharedDefaults setValue:value forKey:key];
    callback(@[[NSNull null]]);
  }

/*
  RCT_EXPORT_METHOD(saveFile: (NSString *)filenameAndKey :(NSString *)urlToFile :(NSString *)appGroup :(NSDictionary *)options :(RCTResponseSenderBlock)callback) {
    if (![appGroup isEqualToString:appGroupName]) {
      appGroupName = appGroup;
      mySharedDefaults = [[NSUserDefaults alloc] initWithSuiteName:appGroup];
    }
    if (mySharedDefaults == nil) {
      // error code 0 == no user defaults with that suite name available
      callback(@[@0]);
      return;
    }

    NSData *data = [NSData dataWithContentsOfURL: [NSURL URLWithString:urlToFile]];
    [mySharedDefaults setObject:data forKey:filenameAndKey];
    callback(@[[NSNull null]]);
  }

RCT_EXPORT_METHOD(getUrlToFile: (NSString *)filenameAndKey :(NSString *)appGroup :(NSDictionary *)options :(RCTResponseSenderBlock)callback) {
    if (![appGroup isEqualToString:appGroupName]) {
        mySharedDefaults = [[NSUserDefaults alloc] initWithSuiteName:appGroup];
    }
    if (mySharedDefaults == nil) {
        // error code 0 == no user defaults with that suite name available
        callback(@[@0]);
        return;
    }

    if ([mySharedDefaults valueForKey:filenameAndKey] == nil) {
        // error code 1 == suite has no value for that key
        callback(@[@1]);
        return;
    }
    NSString *absolutePath = [[mySharedDefaults URLForKey:filenameAndKey] absolutePath];
    callback(@[[NSNull null], absolutePath]);
}
*/

@end
