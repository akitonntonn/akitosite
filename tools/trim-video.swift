import AVFoundation
import Foundation

let args = CommandLine.arguments
guard args.count == 4 else {
  fputs("Usage: trim-video.swift <input> <output> <durationSeconds>\n", stderr)
  exit(2)
}

let inputURL = URL(fileURLWithPath: args[1])
let outputURL = URL(fileURLWithPath: args[2])
let durationSeconds = Double(args[3]) ?? 10

try? FileManager.default.removeItem(at: outputURL)

let asset = AVURLAsset(url: inputURL)
guard let export = AVAssetExportSession(asset: asset, presetName: AVAssetExportPresetPassthrough) ??
  AVAssetExportSession(asset: asset, presetName: AVAssetExportPresetHighestQuality) ??
  AVAssetExportSession(asset: asset, presetName: AVAssetExportPresetMediumQuality) else {
  fputs("Could not create export session\n", stderr)
  exit(1)
}

export.outputURL = outputURL
export.outputFileType = outputURL.pathExtension.lowercased() == "mov" ? .mov : .mp4
export.shouldOptimizeForNetworkUse = true
export.timeRange = CMTimeRange(
  start: .zero,
  duration: CMTime(seconds: durationSeconds, preferredTimescale: 600)
)

let semaphore = DispatchSemaphore(value: 0)
export.exportAsynchronously {
  semaphore.signal()
}
semaphore.wait()

switch export.status {
case .completed:
  print("Wrote \(outputURL.path)")
case .failed:
  fputs("Export failed: \(export.error?.localizedDescription ?? "unknown error")\n", stderr)
  exit(1)
case .cancelled:
  fputs("Export cancelled\n", stderr)
  exit(1)
default:
  fputs("Export ended with status \(export.status.rawValue)\n", stderr)
  exit(1)
}
