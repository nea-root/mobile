//
//  RCTNativeLocalStorage.m
//  mobile
//
//  Created by Varun Rachakatla on 03/11/24.
//

//  RCTNativeLocalStorage.m
//  TurboModuleExample

#import "RCTNativeRNConfig.h"


@implementation RCTNativeRNConfig

RCT_EXPORT_MODULE(NativeRNConfig);


- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const facebook::react::ObjCTurboModule::InitParams &)params {
  return std::make_shared<facebook::react::NativeRNConfigSpecJSI>(params);
}

- (NSString *)getEnv
{
#if DEV
  return @"dev";
#elif DEBUG
  return @"staging";
#else
  return @"prod";
#endif
}

@end
